const
    path = require('path'),
    fs = require('fs');

module.exports = function(){
    var base = path.join.apply(null, arguments);
    return function(file){
          return fs.readFileSync(path.join(base, file), 'utf-8');
    }
}
