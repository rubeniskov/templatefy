const
    through = require('through2'),
    interpolate = require('interpolate'),
    optiopus = require('optiopus'),
    fs = require('fs'),
    path = require('path'),
    templates = {
        exports: fs.readFileSync(path.join(__dirname, './templates/exports.tmpl'), 'utf-8'),
        template: fs.readFileSync(path.join(__dirname, './templates/scope.tmpl'), 'utf-8'),
        global: fs.readFileSync(path.join(__dirname, './templates/global.tmpl'), 'utf-8')
    },
    iopts = {
        delimiter: '{%%}'
    },
    defaults = optiopus({
        scope: true,
        exports: false,
        global: false
    });

module.exports = function(options) {
    if (!(options && options.templatefy))
        return through();

    var data = '',
        opts = defaults.options(options ? options.templatefy : {});

    return through(function(chunk, encoding, done) {
        data += chunk.toString();
        done(null);
    }, function(end) {
        try {
            opts.option('global') &&
                (data = data + interpolate(templates.global, opts.options, iopts));
            opts.option('exports') &&
                (data = data + interpolate(templates.exports, opts.options, iopts));
            opts.option('scope') &&
                (data = util.format(interpolate(templates.exports, opts.options, iopts), data));
            this.push(data);
            end(null);
        } catch (err) {
            end(err);
        }
    });
}
