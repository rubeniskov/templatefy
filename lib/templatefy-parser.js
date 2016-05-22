const
    util = require('util'),
    interpolate = require('./templatefy-interpolate');

module.exports = function(options, templates){
    return function(data){
        var parser = {
                data: data,
                parse: function parse(option, transform){
                    var opt = options.option(option);
                    if(opt != null && opt !== false){
                        parser.data = util.format(interpolate(templates[option],
                        (transform && transform.call ? transform : function(){
                            return options.options || {};
                        })(opt) || options.options), parser.data);
                    }
                    return parser;
                }
            };
        return parser;
    }
}
