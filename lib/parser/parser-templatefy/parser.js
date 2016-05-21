const
    through = require('through2'),
    interpolate = require('interpolate'),
    optiopus = require('optiopus'),
    fs = require('fs'),
    path = require('path'),
    util = require('util'),
    load = function(p){
        return fs.readFileSync(path.join(__dirname, p), 'utf-8')
    },
    templates = {
        var: load('./templates/var.tmpl'),
        exports: load('./templates/exports.tmpl'),
        scope: load('./templates/scope.tmpl'),
        global: load('./templates/global.tmpl')
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
        opts = defaults.options(options);

    return through.obj(function(chunk, encoding, done) {
        data += chunk.toString();
        done(null);
    }, function(end) {
          if(opts.option('global')){
              var _gbl = opts.option('global');
                  _gbl = typeof(_gbl) === 'string' ? _gbl.split(/\:/) : _gbl;
              opts.option('global', {
                  var: _gbl[1]
                      ? _gbl[0]
                      : opts.option('scope')
                          ? 'global'
                          : 'window',
                  name: _gbl[1] || _gbl[0]
              });
              data = util.format(interpolate(templates.global, opts.options, iopts), data);
          }
          if(opts.option('exports')){
              data = util.format(interpolate(templates.exports, opts.options, iopts), data);
          }
          if(opts.option('var')){
              data = util.format(interpolate(templates.var, opts.options, iopts), data);
          }
          if(opts.option('scope')){
              data = util.format(interpolate(templates.scope, opts.options, iopts), data);
          }
        this.push(data);
        end(null);
    });
}
