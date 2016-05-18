const
    path = require('path'),
    fs = require('fs'),
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
        this.timeout(5000);
        it('should print help to stdout', function(done) {
            templatefy('--help', function(error, stdout, stderr) {
                expect(stdout).to.have.string('Usage:');
                expect(stdout).to.have.string('-i, --input');
                expect(stdout).to.have.string('-o, --output');
                expect(stdout).to.have.string('-m, --minify');
                expect(stdout).to.have.string('-ll, --log-level');
                expect(stdout).to.have.string('-lf, --log-file');
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

        it('should show error unexpected paramenter message', function(done) {
            templatefy('--wrong-param', function(error, stdout, stderr) {
                expect(stdout).to.have.string('\'--wrong-param\' expects a value');
                done();
            });
        });

//        it('should require --input argument if not pipe stdin defined', function(done) {
//            templatefy(function(error, stdout, stderr) {
//                expect(stdout).to.have.string('input argument is required');
//                done();
//            });
//        });

        it('should print the string template by input parameter to parsed through stdout', function(done) {
            templatefy('--input=\'<h1  title = "test">Test</h1>\'', function(error, stdout, stderr) {
                expect(stdout).to.have.string('<h1 title="test">Test</h1>');
                done();
            });
        });

        it('should print the string template by path input parameter to parsed through stdout', function(done) {
            templatefy('--input=./test/fixtures/template-element.html', function(error, stdout, stderr) {
                expect(stdout).to.have.string('<h1 title="test">Test</h1>');
                done();
            });
        });

        it('should print the string template by stdin pipe to parsed through stdout', function(done) {
            templatefy('echo \'<h1  title = "test">Test</h1>\'', null, function(error, stdout, stderr) {
                expect(stdout).to.have.string('<h1 title="test">Test</h1>');
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
