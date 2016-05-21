const
    path = require('path'),
    fs = require('fs'),
    cli = require('./plugins/cli')(path.resolve('./bin/templatefy')),
    pkg = JSON.parse(fs.readFileSync('./package.json'), 'utf8');

module.exports = function(expect){

    describe('#cli', function() {
        this.timeout(15000);
        it('should print help to stdout', function(done) {
            cli('--help', function(error, stdout, stderr) {
                expect(stdout).to.have.string('Usage:');
                expect(stdout).to.have.string('-i, --input');
                expect(stdout).to.have.string('-o, --output');
                expect(stdout).to.have.string('-s, --scope');
                expect(stdout).to.have.string('-e, --exports');
                expect(stdout).to.have.string('-r, --var');
                expect(stdout).to.have.string('-g, --global');
                expect(stdout).to.have.string('-a, --angular');
                expect(stdout).to.have.string('-l, --linter');
                expect(stdout).to.have.string('-V, --log');
                expect(stdout).to.have.string('-v, --version ');
                done();
            });
        });

        it('should print version to stdout', function(done) {
            cli('--version', function(error, stdout, stderr) {
                expect(stdout).to.have.string(pkg.version);
                done();
            });
        });
//        it('should require --input argument if not pipe stdin defined', function(done) {
//            cli('--ouput=stdout', function(error, stdout, stderr) {
//                expect(stdout).to.have.string('input argument is required');
//                done();
//            });
//        });
        it('should show error unexpected paramenter message', function(done) {
            cli('--wrong-param', function(error, stdout, stderr) {
                expect(stdout).to.have.string('\'--wrong-param\' expects a value');
                done();
            });
        });

        it('should get the string template by stdin then and print parsed over stdout', function(done) {
            cli('--input=<h1  title = "test">Test</h1>', function(error, stdout, stderr) {
                expect(stdout).to.have.string('<h1 title="test">Test</h1>');
                done();
            });
        });

        it('should get the string template by input path parameter and print parsed over stdout', function(done) {
            cli('--input=./test/fixtures/template-element.html', function(error, stdout, stderr) {
                expect(stdout).to.have.string('<h1 title="test">Test</h1>');
                done();
            });
        });

        it('should get the string template by stdin pipe and print parsed over stdout', function(done) {
            cli('echo \'<h1  title = "test">Test</h1>\'', null, function(error, stdout, stderr) {
                expect(stdout).to.have.string('<h1 title="test">Test</h1>');
                done();
            });
        });

        it('should get the string template by stdin then and save parsed into a file', function(done) {
            cli('echo \'<h1  title = "test">Test</h1>\'', '--output=template.output.html', function(error, stdout, stderr) {
                expect(fs.readFileSync('template.output.html', 'utf-8')).to.have.string('<h1 title="test">Test</h1>');
                done();
            });
        });

        it('should parsed template with angular module wrapper', function(done) {
            cli(['--input=<h1  title = "test">Test</h1>', '--angular'], function(error, stdout, stderr) {
                expect(stdout).to.have.string('angular.module');
                expect(stdout).to.have.string('$templateCache');
                expect(stdout).to.have.string('<h1 title="test">Test</h1>');
                done();
            });
        });

        it('should parsed template with angular module wrapper and defined custom module local variable name', function(done) {
            cli(['--input=<h1  title = "test">Test</h1>', '--angular', '--angular-module-var=var_test'], function(error, stdout, stderr) {
                expect(stdout).to.have.string('angular.module');
                expect(stdout).to.have.string('$templateCache');
                expect(stdout).to.have.string('var var_test');
                expect(stdout).to.have.string('<h1 title="test">Test</h1>');
                done();
            });
        });

        it('should parsed template with angular module wrapper and defined custom module name', function(done) {
            cli(['--input=<h1  title = "test">Test</h1>', '--angular', '--angular-module-name=module_test'], function(error, stdout, stderr) {
                expect(stdout).to.have.string('angular.module');
                expect(stdout).to.have.string('$templateCache');
                expect(stdout).to.have.string('module_test');
                expect(stdout).to.have.string('<h1 title="test">Test</h1>');
                done();
            });
        });

        it('should parsed template with only with $templateCache injection', function(done) {
            cli(['--input=<h1  title = "test">Test</h1>', '--angular', '--angular-module=false'], function(error, stdout, stderr) {
                expect(stdout).to.not.have.string('angular.module');
                expect(stdout).to.have.string('$templateCache');
                expect(stdout).to.have.string('<h1 title="test">Test</h1>');
                done();
            });
        });

        it('should parsed template with only with $templateCache injection and custom template name', function(done) {
            cli(['--input=<h1  title = "test">Test</h1>', '--angular', '--angular-module=false', '--angular-template-name=template_test'], function(error, stdout, stderr) {
                expect(stdout).to.not.have.string('angular.module');
                expect(stdout).to.have.string('$templateCache');
                expect(stdout).to.have.string('template_test');
                expect(stdout).to.have.string('<h1 title="test">Test</h1>');
                done();
            });
        });

        it('should parsed template scoped in a function clousure', function(done) {
            cli(['--input=<h1  title = "test">Test</h1>', '--scope'], function(error, stdout, stderr) {
                expect(stdout).to.have.string('!(function(global, module){');
                expect(stdout).to.have.string('typeof global !== "undefined"');
                expect(stdout).to.have.string('<h1 title="test">Test</h1>');
                done();
            });
        });

        it('should parsed template with variable assignment', function(done) {
            cli(['--input=<h1  title = "test">Test</h1>', '--var=var_test'], function(error, stdout, stderr) {
                expect(stdout).to.have.string('var var_test');
                expect(stdout).to.have.string('<h1 title="test">Test</h1>');
                done();
            });
        });

        it('should parsed template with global property assignment', function(done) {
            cli(['--input=<h1  title = "test">Test</h1>', '--global=globalTest:globalProperty'], function(error, stdout, stderr) {
                expect(stdout).to.have.string('globalTest[\'globalProperty\']');
                expect(stdout).to.have.string('<h1 title="test">Test</h1>');
                done();
            });
        });

        it('should parsed template with global property assignment in window', function(done) {
            cli(['--input=<h1  title = "test">Test</h1>', '--global=globalProperty'], function(error, stdout, stderr) {
                expect(stdout).to.have.string('window');
                expect(stdout).to.have.string('<h1 title="test">Test</h1>');
                done();
            });
        });

        it('should parsed template with global property assignment in global', function(done) {
            cli(['--input=<h1  title = "test">Test</h1>', '--global=globalProperty --scope'], function(error, stdout, stderr) {
                expect(stdout).to.have.string('global');
                expect(stdout).to.have.string('<h1 title="test">Test</h1>');
                done();
            });
        });

        it('should parsed template and exports as module', function(done) {
            cli(['--input=<h1  title = "test">Test</h1>' , '--output=unit-test-module.js', '--exports'], function(error, stdout, stderr) {
                var template = require(path.join(process.cwd(), './unit-test-module.js'));
                expect(template).to.have.string('<h1 title="test">Test</h1>');
                done();
            });
        });

        it('should parsed template and exports as global property in a scoped clousure', function(done) {
            cli(['--input=<h1  title = "test">Test</h1>' , '--output=unit-test-module.js', '--scope', '--global=templatefy'], function(error, stdout, stderr) {
                expect(global.templatefy).to.not.be.ok;
                eval(fs.readFileSync(path.join(process.cwd(), './unit-test-module.js'), 'utf-8'));
                expect(global.templatefy).to.be.ok;
                expect(global.templatefy).to.be.equal('<h1 title="test">Test</h1>');
                done();
            });
        });

        it('should parsed template with linter validations; no errors', function(done) {
            cli(['--input=./test/fixtures/template-element.html', '--linter'], function(error, stdout, stderr) {
                expect(stdout).to.not.match(/\<\!-- E[0-9]{3}\:/ig);
                expect(stdout).to.have.string('<h1 title="test">Test</h1>');
                done();
            });
        });

        it('should parsed template with linter validations; with ending no lf ending error', function(done) {
            cli(['--input=<h1  title =test>Test</h1>', '--linter'], function(error, stdout, stderr) {
                expect(stdout).to.match(/\<\!-- E[0-9]{3}\:/ig);
                expect(stdout).to.have.string('<!-- E015: [1:26] line ending does not match format: lf -->');
                expect(stdout).to.have.string('<!-- E005: [1:13] the `title` attribute is not double quoted -->');
                expect(stdout).to.have.string('<h1 title="test">Test</h1>');
                done();
            });
        });
    });
}
