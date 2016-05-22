const
    stream = require('../../templatefy-stream'),
    minify = require('html-minifier').minify;

module.exports = function(options) {
    return stream(function(data) {
        return minify(data);
    });
}
