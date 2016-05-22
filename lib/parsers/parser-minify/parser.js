const
    through = require('through2'),
    minify = require('html-minifier').minify;

module.exports = function(options) {
    var data = '';
    return through(function(chunk, encoding, next) {
        data += chunk.toString();
        next();
    }, function(end) {
        this.push(minify(data));
        end();
    });
}
