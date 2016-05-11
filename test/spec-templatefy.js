const
    path = require('path'),
    fs = require('fs'),
    expect = require("chai").expect,
    execFile = require('child_process').execFile,
    exec = require('child_process').exec,
    Templatefy = require("../lib/templatefy"),
    cmd = path.resolve('./bin/templatefy'),
    pkg = JSON.parse(fs.readFileSync('./package.json'), 'utf8'),
    templatefy = function() {
        var args = Array.prototype.slice.call(arguments),
            cb = args.splice(-1)[0];
        return execFile(cmd, args, cb);
    };

describe('Templatefy', function() {

    describe('#command-line', function() {

        it('should print help to stdout', function(done) {
            templatefy('--help', function(error, stdout, stderr) {
                expect(stdout).to.have.string('Usage:');
                expect(stdout).to.have.string('-i, --input');
                expect(stdout).to.have.string('-o, --output');
                expect(stdout).to.have.string('-m, --minify');
                expect(stdout).to.have.string('-a, --angular');
                expect(stdout).to.have.string('-am, --angular-module');
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

        // it('should require input argument if not pipe stdin defined', function(done) {
        //     this.timeout(15000);
        //     templatefy(function(error, stdout, stderr) {
        //         console.log(error, stdout, stderr);
        //         done();
        //     });
        // });

        // it('should require input argument if not pipe stdin defined', function(done) {
        //     this.timeout(15000);
        //     templatefy('--input=<h1>Test</h1>', function(error, stdout, stderr) {
        //         expect(stdout).to.have.string('\'<h1>Test</h1>\'');
        //         //console.log(stdout, stderr);
        //         done();
        //     });
        // });
    });

    describe('#api', function() {

        // it('should instantiate templatefy object', function(done) {
        //       Templatefy.parse();
        // });
        //
        // it('should instantiate templatefy object', function(done) {
        //
        // });
    });
});

 // echo '<hola    asdasdasd="asdasd"></hola>' | node bin/templatefy --angular=true --angular-module='jaja' --log-level=debug

 // node bin/templatefy --input='<hola    asdasdasd="asdasd"></hola>' --angular=true --angular-module='jaja' --log-level=debug
