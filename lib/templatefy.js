const
    fs = require('fs'),
    stream = require('stream'),
    streamifier = require('streamifier'),
    path = require('path'),
    through = require('through2'),
    winston = require('winston'),
    q = require('q'),
    extend = require('util-extend'),
    instsure = require('instsure'),
    reg_html = /\<([A-Za-z][A-Za-z0-9]*)\b[^\>]*\>(.*?)\<\/\1>/ig,
    pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8')),

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

    Templatefy.defaults = {
        minify: false,
        angular: false,
        log: {
            level: 'none',
            file: null
        }
    };

    Templatefy.parsers = [
        require('./parser/parser.minify'),
        require('./parser/parser.templatefy'),
        require('./parser/parser.angular')
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
            inpt = args[curs++];
            oupt = !args[curs] || typeof(args[curs]) === 'function' ? through(function (chunk, enc, next) {
                next(null, data += chunk.toString());
            }, function(end) {
                args[curs] && done(args[curs], null, data);
                end();
            }) : args[curs++];

        try {
            (stdo = stdo
                .pipe(Templatefy._input(inpt))
                .pipe(Templatefy._parse(extend({}, Templatefy.defaults, opts)))
                .pipe(Templatefy._ouput(oupt)));
        } catch (err) {
            done(null, err);
        }

        return stdo;
    };

    Templatefy._parse = function(options) {
        var prs = Templatefy.parsers,
            std = through().on('pipe', function(source) {
                source.unpipe(this);
                for (var i = 0; i < prs.length; i++) {
                    this.transformStream = source = source.pipe(prs[i](options));
                }
            })

        std.pipe = function(destination, options) {
            return this.transformStream.pipe(destination, options);
        };
        return std;
    }

    Templatefy._input = function(std) {
        if (std instanceof stream && std.readable) {
            return std;
        } else if (typeof(std) === 'string') {
            if (reg_html.test(std)) {
                return streamifier.createReadStream(new Buffer(std, 'utf-8'));
            } else {
                return fs.createReadStream(path.resolve(std));
            };
        }
        throw new Error('Input stream error');
    };

    Templatefy._ouput = function(std) {
        if (std instanceof stream && std.writable) {
            return std;
        } else if (typeof(std) === 'string') {
            return fs.createWriteStream(path.resolve(std));
        }
        throw new Error('Ouput stream error');
    };
