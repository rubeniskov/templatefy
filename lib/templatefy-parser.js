const
    util = require('util'),
    interpolate = require('./templatefy-interpolate');

module.exports = function(options, templates){
    return function(data){
        var parser = {
                data: data,
                parse: function parse(option, transform){
                    if(options[option] != null && options[option] !== false)
                        parser.data = util.format(interpolate(templates[option],
                        (transform && transform.call ? transform : function(){
                            return options || {};
                        })(options[option]) || options), parser.data);
                    return parser;
                }
            };
        return parser;
    }
}
