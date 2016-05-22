const
    optiopus = require('optiopus'),
    through = require('through2'),
    util = require('util'),
    parser = require('../../templatefy-parser'),
    load = require('../../templatefy-loader')(__dirname, './templates/'),
    templates = {
        'module': load('angular-module.tmpl'),
        'module.run': load('angular-run.tmpl'),
        'template': load('angular-template.tmpl')
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
        opts = defaults.options(options.angular),
        pars = parser(opts.options, templates);

    return through.obj(function(chunk, encoding, done) {
        data += chunk.toString();
        done(null);
    }, function(end) {
        data = pars(data)
          .parse('template')
          .parse('module.run', function(value){
              var args = (['$templateCache']).concat(opts.option('module.run.args') || []);
              opts.option({
                  'module.run.stargs': args.join('\',\''),
                  'module.run.sqargs': args.join(',')
              });
          })
          .parse('module', function(value){
              var deps = opts.option('module.deps') || [];
              opts.option({
                  'module.stdeps': (deps.length ? util.format('\'%s\'', deps.join('\',\'')) : '')
              });
          })
          .data;
        this.push(data);
        end();
    });
}
