const
    util = require('util'),
    through = require('through2'),
    lint = require('htmllint'),
    os = require('os');

module.exports = function(options) {
    if (!(options && options.linter))
        return through();
    var data = '';
    return through.obj(function(chunk, encoding, done) {
        data += chunk.toString();
        done();
    }, function(end) {
        var self = this;
        lint(data, options.linter)
            .done(function(errors){
                var msgerr = errors.map(function(error){
                        return util.format('%s: [%s:%s] %s', error.code, error.line, error.column, lint.messages.renderIssue(error));
                    }),
                    strerr = msgerr.map(function(msg){
                        return '<!-- ' + msg + ' -->'
                    });
                self.push(util.format('\n%s\n%s', strerr.join(os.EOL), data));
                end();
            });
    });
}
