const
    optiopus = require('optiopus'),
    parser = require('../../templatefy-parser'),
    stream = require('../../templatefy-stream'),
    load = require('../../templatefy-loader')(__dirname, './templates/'),
    templates = {
        var: load('var.tmpl'),
        exports: load('exports.tmpl'),
        scope: load('scope.tmpl'),
        global: load('global.tmpl')
    },
    defaults = optiopus({
        scope: false,
        exports: false,
        global: false,
        var: false
    });

module.exports = function(options) {
    var data = '',
        opts = defaults.options(options),
        pars = parser(opts, templates);

    return stream(function(data){
        return pars(data)
          .parse('global', function(value){
              value = typeof(value) === 'string' ? value.split(/\:/) : value;
              opts.option('global', {
                  var: value[1]
                      ? value[0]
                      : opts.option('scope')
                          ? 'global'
                          : 'window',
                  name: value[1] || value[0]
              });
          })
          .parse('exports')
          .parse('var')
          .parse('scope')
          .data;
    });
}
