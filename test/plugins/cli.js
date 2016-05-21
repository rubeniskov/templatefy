const path = require('path'),
      cproc = require('child_process'),
      instanbul_cli = path.join(require.resolve('istanbul'), '..', require('istanbul/package.json').bin.istanbul);

module.exports = function(cli){
    return function() {
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
    }
}
