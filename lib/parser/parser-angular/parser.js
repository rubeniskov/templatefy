const
    through = require('through2'),
    util = require('util'),
    fs = require('fs'),
    path = require('path'),
    templates = {
        module: fs.readFileSync(path.join(__dirname, './templates/module.tmpl'), 'utf-8'),
        template: fs.readFileSync(path.join(__dirname, './templates/template.tmpl'), 'utf-8')
    };

module.exports = function(options) {
    var data = '';
    return through(function(chunk, encoding, done) {
        data += chunk.toString();
        done(null);
    }, function(end) {
        try {
            data = util.format(templates.template, 'templateName', data);
            data = util.format(templates.module, 'moduleName', data);
            this.push(data);
            end(null);
        } catch (err) {
            end(err);
        }
    });
}

'angular.module("%s").run(["$templateCache", function($tc){ $tc.put(%s) }])'
