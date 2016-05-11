const
    through = require('through2'),
    util = require('util');

module.exports = function(options) {
    var data = '';
    return through(function(chunk, encoding, done) {
        data += chunk.toString();
        done(null);
    }, function(end) {
        try {
            this.push(util.format('angular.module("%s").run(["$templateCache", function($tc){ $tc.put(%s) }])', 'template', data));
            end(null);
        } catch (err) {
            end(err);
        }
    });
}
