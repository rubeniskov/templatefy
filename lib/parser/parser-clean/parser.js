const
    through = require('through2'),
    escape = function(content) {
        return content
                .replace(/\\/g, '\\\\')
                .replace(/\n+$/, '')
                .replace(/'/g, '\\\'')
                .replace(/\r?\n/g, '\\n\' +\n    \'');
    };

module.exports = function(options) {
    var data = '';

    return through.obj(function(chunk, encoding, done) {
        data += chunk.toString();
        done(null);
    }, function(end) {
        this.push("'" + escape(data) + "'");
        end();
    });
}
