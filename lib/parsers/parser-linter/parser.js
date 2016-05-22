const
    util = require('util'),
    stream = require('../../templatefy-stream'),
    lint = require('htmllint'),
    os = require('os');

module.exports = function(options) {
    if (!(options && options.linter))
        return stream();

    return stream(function(data, done){
        lint(data, options.linter)
            .done(function(errors){
                var msgerr = errors.map(function(error){
                        return util.format('%s: [%s:%s] %s', error.code, error.line, error.column, lint.messages.renderIssue(error));
                    }),
                    strerr = msgerr.map(function(msg){
                        return '<!-- ' + msg + ' -->'
                    });
                done(util.format('\n%s\n%s', strerr.join(os.EOL), data));
            });
    });
}
