const
    through = require('through2'),
    optiopus = require('optiopus'),
    parser = require('../../templatefy-parser'),
    load = require('../../templatefy-loader')(__dirname, './templates/'),
    templates = {
        var: load('var.tmpl'),
        exports: load('exports.tmpl'),
        scope: load('scope.tmpl'),
        global: load('global.tmpl')
    },
    iopts = {
        delimiter: '{%%}'
    },
    defaults = optiopus({
        scope: false,
        exports: false,
        global: false,
        var: false
    });

module.exports = function(options) {
    if (!options)
        return through();

    var data = '',
        opts = defaults.options(options),
        pars = parser(opts.options, templates);

    return through.obj(function(chunk, encoding, done) {
        data += chunk.toString();
        done(null);
    }, function(end) {
        data = pars(data)
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
        this.push(data);
        end(null);
    });
}
