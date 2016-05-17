const
    optiopus = require('optiopus'),
    nutol = require('nutol'),
    through = require('through2'),
    interpolate = require('interpolate'),
    util = require('util'),
    fs = require('fs'),
    path = require('path'),
    templates = {
        angular: fs.readFileSync(path.join(__dirname, './templates/angular.tmpl'), 'utf-8'),
        template: fs.readFileSync(path.join(__dirname, './templates/template.tmpl'), 'utf-8')
    },
    iopts = {
        delimiter: '{%%}'
    },
    defaults = optiopus({
        'module.name': 'templatefy',
        'module.var': 'templatefy',
        'module.deps': [''],
        'module.args': ['$templateCache'],
        'template.name': 'templatefy'
    });

module.exports = function(options) {
    if (!(options && options.angular))
        return through();

    var data = '',
        opts = defaults.options(options ? options.angular : {});

        opts.option({
            'module.stargs' : opts.option('module.args').join('\',\''),
            'module.args' : opts.option('module.args').join(','),
            'module.deps' : opts.option('module.deps').join(',')
        });

    return through(function(chunk, encoding, done) {
        data += chunk.toString();
        done(null);
    }, function(end) {
        try {

            data = util.format(interpolate(templates.template, opts.options, iopts), data);
            data = util.format(interpolate(templates.angular, opts.options, iopts), data);
            this.push(data);
            end(null);
        } catch (err) {
            end(err);
        }
    });
}
