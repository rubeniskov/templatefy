const
    include = require,
    fs = require('fs'),
    stream = require('stream'),
    streamifier = require('streamifier'),
    path = require('path'),
    through = require('through2'),
    winston = require('winston'),
    q = require('q'),
    optiopus = require('optiopus'),
    instsure = require('instsure'),
    inherify = require('inherify'),
    reg_html = /(<([^>]+)>)/img,
    pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8')),
    defaults = optiopus({
        minify: false,
        angular: false,
        log: {
            level: 'none',
            file: null
        }
    }),
    TemplatefyError = inherify(Error, {
        __constructor: function(settings) {
            settings = typeof(settings) === 'string' ? {
                message: settings
            } : settings || {};
            this.name = 'TemplatefyError';
            this.type = settings.type || 'Application';
            this.message = settings.message || 'An error occurred.';
            this.detail = settings.detail || '';
            this.extendedInfo = settings.extendedInfo || '';
            this.errorCode = settings.errorCode || '';
            Error.captureStackTrace(this, TemplatefyError);
        }
    }),

    Templatefy = module.exports = instsure(function(options) {
        this.options = options || {};
        this.logger(options);
    });

    Templatefy.prototype.logger = function(opts) {
        var defaults = this.defaults.log;
        this.logger = this.logger = new(winston.Logger)({
            level: opts.level || defaults.level
        });

        if (opts.file) {
            this.logger
                .add(winston.transports.File, {
                    filename: path.resolve(process.cwd(), opts.file)
                });
        }
    };

    Templatefy.prototype.parse = function(input){
        return q.Promise(function(resolve, reject) {
            Templatefy.parse(this.options, input, function(err, data) {
                return err ? reject(err) : resolve(this, data);
            });
        });
    };

    Templatefy.version = pkg.version;

    Templatefy.defaults = defaults.defaults;

    Templatefy.parsers = [
        include('./parser/parser-minify'),
        include('./parser/parser-clean'),
        include('./parser/parser-angular'),
        include('./parser/parser-templatefy')
    ];

    Templatefy.parse = function() {
        var curs = 0,
            stdo = through(),
            args = Array.prototype.slice.call(arguments),
            data = '',
            erro = function(err) {
                if (err) throw err;
            },
            done = function(fn, err, chunk, buffer){
                (fn||erro).call(stdo, err, chunk, buffer)
            },
            opts = typeof(args[curs]) === 'object' &&
                args[curs].constructor === Object ? args[curs++] : {};
            inpt = args[curs++] || opts.input;
            oupt = !args[curs] || typeof(args[curs]) === 'function' ? through(function (chunk, enc, next) {
                next(null, data += chunk.toString());
            }, function(end) {
                if(args[curs])
                    done(args[curs], null, data);
                end();
            }) : args[curs++] || opts.output;
        try {
            (stdo = stdo
                .pipe(Templatefy._input(inpt))
                .pipe(Templatefy._parse(opts))
                .pipe(Templatefy._ouput(oupt)));
        } catch (err) {
            done(null, err);
        }

        return stdo;
    };

    Templatefy._parse = function(options) {
        var opts = defaults.options(options).options,
            prs = Templatefy.parsers,
            std = through().on('pipe', function(source) {
                source.unpipe(this);
                for (var i = 0; i < prs.length; i++) {
                    this.transformStream = source = source.pipe(prs[i](opts));
                }
            });

        std.pipe = function(destination, options) {
            return this.transformStream.pipe(destination, options);
        };
        return std;
    }

    Templatefy._input = function(std) {
        if (std instanceof stream && std.readable) {
            return std;
        } else if (typeof(std) === 'string') {
            if (std === 'stdin') {
                return process.stdin;
            } else if (std.match(reg_html)) {
                return streamifier.createReadStream(new Buffer(std, 'utf-8'));
            } else {
                return fs.createReadStream(path.resolve(std));
            };
        }
        throw new TemplatefyError('Input stream error');
    }

    Templatefy._ouput = function(std) {
        if (std instanceof stream && std.writable) {
            return std;
        } else if (typeof(std) === 'string') {
            if (std === 'stdout') {
                return process.stdout;
            } else {
                return fs.createWriteStream(path.resolve(std));
            }
        } else if (std === null || std === undefined) {
            return process.stdout;
        }
        throw new TemplatefyError('Ouput stream error');
    };
