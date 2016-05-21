const
    optiopus = require('optiopus'),
    nutol = require('nutol'),
    through = require('through2'),
    interpolate = require('interpolate'),
    util = require('util'),
    fs = require('fs'),
    path = require('path'),
    templates = {
        'angular_module': fs.readFileSync(path.join(__dirname, './templates/angular-module.tmpl'), 'utf-8'),
        'angular_run': fs.readFileSync(path.join(__dirname, './templates/angular-run.tmpl'), 'utf-8'),
        'angular_template': fs.readFileSync(path.join(__dirname, './templates/angular-template.tmpl'), 'utf-8')
    },
    iopts = {
        delimiter: '{%%}'
    },
    defaults = optiopus({
        'shim': 'angular',
        'module.name': 'templatefy',
        'module.var': 'templatefy',
        'module.deps': [],
        'module.run.args': [],
        'template.name': 'templatefy'
    });

module.exports = function(options) {
    if (!(options && options.angular))
        return through();

    var data = '',
        opts = defaults.options(options.angular);

    return through.obj(function(chunk, encoding, done) {
        data += chunk.toString();
        done(null);
    }, function(end) {
        if (opts.option('template')) {
            data = util.format(interpolate(templates.angular_template, opts.options, iopts), data);
        }
        if (opts.option('module.run')) {
            var args = (['$templateCache']).concat(opts.option('module.run.args') || []);
            opts.option({
                'module.run.stargs': args.join('\',\''),
                'module.run.sqargs': args.join(',')
            });
            data = util.format(interpolate(templates.angular_run, opts.options, iopts), data);
        }
        if (opts.option('module')) {
            var deps = opts.option('module.deps') || [];
            opts.option({
                'module.stdeps': (deps.length ? util.format('\'%s\'', deps.join('\',\'')) : '')
            });
            data = util.format(interpolate(templates.angular_module, opts.options, iopts), data);
        }
        this.push(data);
        end();
    });
}
