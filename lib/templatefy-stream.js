const
    through = require('through2');

module.exports = function(transform){
    if(!transform)
        return through();
    var data = '';
    return through.obj(function(chunk, encoding, done) {
        data += chunk.toString();
        done(null);
    }, function(end) {
          var self = this,
              done = function(data){
                  data && self.push(data);
                  end(null);
              };
          (data = transform.call(self, data, done)) && done(data);
    });
}
