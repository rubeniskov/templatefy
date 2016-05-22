const
    stream = require('../../templatefy-stream'),
    escape = function(content) {
        return content
                .replace(/\\/g, '\\\\')
                .replace(/\n+$/, '')
                .replace(/'/g, '\\\'')
                .replace(/\r?\n/g, '\\n\' +\n    \'');
    };

module.exports = function(options) {
    return stream(function(data){
        return "'" + escape(data) + "'";
    });
}
