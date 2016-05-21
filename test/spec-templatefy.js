const
    path = require('path'),
    fs = require('fs'),
    rewire = require("rewire"),
    expect = require("chai").expect,
    execFile = require('child_process').execFile,
    cproc = require('child_process'),
    Templatefy = require("../lib/templatefy"),
    cli = path.resolve('./bin/templatefy'),
    pkg = JSON.parse(fs.readFileSync('./package.json'), 'utf8'),
    instanbul_cli = path.join(require.resolve('istanbul'), '..', require('istanbul/package.json').bin.istanbul),
    mocha = require.resolve('mocha'),
    templatefy = function() {
        var mproc, sproc,
            args = Array.prototype.slice.call(arguments),
            cb = args.splice(-1)[0],
            targs = args.splice(-1)[0] || '',
            pcmd = args.splice(-1)[0],
            stdout = '',
            stderr = '',
            err = null,
            cargs = [
              'cover',
              '--handle-sigint',
              '--root', process.cwd(),
              '--dir', path.join(process.cwd(), './coverage'),
              '--report=none',
              '--print=none',
              '--include-pid',
              cli, '--'
            ].concat(targs);
        mproc = cproc.fork(instanbul_cli, cargs, {cwd: process.cwd(), env: process.env, silent: true});

        if(pcmd)
            cproc.exec(pcmd).stdout.pipe(mproc.stdin);

        mproc.on('error', function (e) {
            err = new Error(e);
        });

        mproc.stdout.on('data', function (data) {
            stdout += data.toString();
        });

        mproc.stderr.on('data', function (data) {
            stderr += data.toString();
        });

        mproc.on('close', function (code) {
            cb(err, stdout, stderr);
        });

        return mproc;
    };

describe('Templatefy', function() {

    describe('#command-line', function() {
        this.timeout(15000);
        it('should print help to stdout', function(done) {
            templatefy('--help', function(error, stdout, stderr) {
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
            templatefy('--version', function(error, stdout, stderr) {
                expect(stdout).to.have.string(pkg.version);
                done();
            });
        });
//        it('should require --input argument if not pipe stdin defined', function(done) {
//            templatefy('--ouput=stdout', function(error, stdout, stderr) {
//                expect(stdout).to.have.string('input argument is required');
//                done();
//            });
//        });
        it('should show error unexpected paramenter message', function(done) {
            templatefy('--wrong-param', function(error, stdout, stderr) {
                expect(stdout).to.have.string('\'--wrong-param\' expects a value');
                done();
            });
        });

        it('should get the string template by stdin then and print parsed over stdout', function(done) {
            templatefy('--input=\'<h1  title = "test">Test</h1>\'', function(error, stdout, stderr) {
                expect(stdout).to.have.string('<h1 title="test">Test</h1>');
                done();
            });
        });

        it('should get the string template by input path parameter and print parsed over stdout', function(done) {
            templatefy('--input=./test/fixtures/template-element.html', function(error, stdout, stderr) {
                expect(stdout).to.have.string('<h1 title="test">Test</h1>');
                done();
            });
        });

        it('should get the string template by stdin pipe and print parsed over stdout', function(done) {
            templatefy('echo \'<h1  title = "test">Test</h1>\'', null, function(error, stdout, stderr) {
                expect(stdout).to.have.string('<h1 title="test">Test</h1>');
                done();
            });
        });

        it('should get the string template by stdin then and save parsed into a file', function(done) {
            templatefy('echo \'<h1  title = "test">Test</h1>\'', '--output=template.output.html', function(error, stdout, stderr) {
                expect(fs.readFileSync('template.output.html', 'utf-8')).to.have.string('<h1 title="test">Test</h1>');
                done();
            });
        });

        it('should parsed template with angular module wrapper', function(done) {
            templatefy(['--input=\'<h1  title = "test">Test</h1>\'', '--angular'], function(error, stdout, stderr) {
                expect(stdout).to.have.string('angular.module');
                expect(stdout).to.have.string('$templateCache');
                expect(stdout).to.have.string('<h1 title="test">Test</h1>');
                done();
            });
        });

        it('should parsed template with angular module wrapper and defined custom module local variable name', function(done) {
            templatefy(['--input=\'<h1  title = "test">Test</h1>\'', '--angular', '--angular-module-var=var_test'], function(error, stdout, stderr) {
                expect(stdout).to.have.string('angular.module');
                expect(stdout).to.have.string('$templateCache');
                expect(stdout).to.have.string('var var_test');
                expect(stdout).to.have.string('<h1 title="test">Test</h1>');
                done();
            });
        });

        it('should parsed template with angular module wrapper and defined custom module name', function(done) {
            templatefy(['--input=\'<h1  title = "test">Test</h1>\'', '--angular', '--angular-module-name=module_test'], function(error, stdout, stderr) {
                expect(stdout).to.have.string('angular.module');
                expect(stdout).to.have.string('$templateCache');
                expect(stdout).to.have.string('module_test');
                expect(stdout).to.have.string('<h1 title="test">Test</h1>');
                done();
            });
        });

        it('should parsed template with only with $templateCache injection', function(done) {
            templatefy(['--input=\'<h1  title = "test">Test</h1>\'', '--angular', '--angular-module=false'], function(error, stdout, stderr) {
                expect(stdout).to.not.have.string('angular.module');
                expect(stdout).to.have.string('$templateCache');
                expect(stdout).to.have.string('<h1 title="test">Test</h1>');
                done();
            });
        });

        it('should parsed template with only with $templateCache injection and custom template name', function(done) {
            templatefy(['--input=\'<h1  title = "test">Test</h1>\'', '--angular', '--angular-module=false', '--angular-template-name=template_test'], function(error, stdout, stderr) {
                expect(stdout).to.not.have.string('angular.module');
                expect(stdout).to.have.string('$templateCache');
                expect(stdout).to.have.string('template_test');
                expect(stdout).to.have.string('<h1 title="test">Test</h1>');
                done();
            });
        });

        it('should parsed template scoped in a function clousure', function(done) {
            templatefy(['--input=\'<h1  title = "test">Test</h1>\'', '--scope'], function(error, stdout, stderr) {
                expect(stdout).to.have.string('!(function(global, module){');
                expect(stdout).to.have.string('typeof global !== "undefined"');
                expect(stdout).to.have.string('<h1 title="test">Test</h1>');
                done();
            });
        });

        it('should parsed template with variable assignment', function(done) {
            templatefy(['--input=\'<h1  title = "test">Test</h1>\'', '--var=var_test'], function(error, stdout, stderr) {
                expect(stdout).to.have.string('var var_test');
                expect(stdout).to.have.string('<h1 title="test">Test</h1>');
                done();
            });
        });

        it('should parsed template with global property assignment', function(done) {
            templatefy(['--input=\'<h1  title = "test">Test</h1>\'', '--global=globalTest:globalProperty'], function(error, stdout, stderr) {
                expect(stdout).to.have.string('globalTest[\'globalProperty\']');
                expect(stdout).to.have.string('<h1 title="test">Test</h1>');
                done();
            });
        });

        it('should parsed template with global property assignment in window', function(done) {
            templatefy(['--input=\'<h1  title = "test">Test</h1>\'', '--global=globalProperty'], function(error, stdout, stderr) {
                expect(stdout).to.have.string('window');
                expect(stdout).to.have.string('<h1 title="test">Test</h1>');
                done();
            });
        });

        it('should parsed template with global property assignment in global', function(done) {
            templatefy(['--input=\'<h1  title = "test">Test</h1>\'', '--global=globalProperty --scope'], function(error, stdout, stderr) {
                expect(stdout).to.have.string('global');
                expect(stdout).to.have.string('<h1 title="test">Test</h1>');
                done();
            });
        });

        it('should parsed template and exports as module', function(done) {
            templatefy(['--input=\'<h1  title = "test">Test</h1>\'' , '--output=unit-test-module.js', '--exports'], function(error, stdout, stderr) {
                var template = require(path.join(process.cwd(), './unit-test-module.js'));
                expect(template).to.have.string('<h1 title="test">Test</h1>');
                done();
            });
        });

        it('should parsed template and exports as global property in a scoped clousure', function(done) {
            templatefy(['--input=\'<h1  title = "test">Test</h1>\'' , '--output=unit-test-module.js', '--scope', '--global=templatefy'], function(error, stdout, stderr) {
                expect(global.templatefy).to.not.be.ok;
                rewire(path.join(process.cwd(), './unit-test-module.js'));
                expect(global.templatefy).to.be.ok;
                expect(global.templatefy).to.have.string('<h1 title="test">Test</h1>');
                done();
            });
        });
    });

    describe('#api', function() {

        it('should throw an Exception (Input stream error)', function() {
             expect(Templatefy.parse).to.throw('Input stream error');
        });
    });
});
