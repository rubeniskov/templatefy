const
    optiopus = require('optiopus'),
    util = require('util'),
    stream = require('../../templatefy-stream'),
    parser = require('../../templatefy-parser'),
    load = require('../../templatefy-loader')(__dirname, './templates/'),
    templates = {
        'module': load('angular-module.tmpl'),
        'module.run': load('angular-run.tmpl'),
        'template': load('angular-template.tmpl')
    },
    castArray = function(arg){
        return typeof(arg) === 'string'
            ? arg.split(/[\,\|]/)
            : arg || [];
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
        return stream();

    var data = '',
        opts = defaults.options(options.angular),
        pars = parser(opts, templates);

    return stream(function(data){
        return pars(data)
          .parse('template')
          .parse('module.run', function(value){
              var args = (['$templateCache']).concat(castArray(opts.option('module.run.args')));
              opts.option({
                  'module.run.stargs': args.join('\',\''),
                  'module.run.sqargs': args.join(',')
              });
          })
          .parse('module', function(value){
              var deps = castArray(opts.option('module.deps'));
              opts.option({
                  'module.stdeps': (deps.length ? util.format('\'%s\'', deps.join('\',\'')) : '')
              });
          })
          .data;
    });
}
