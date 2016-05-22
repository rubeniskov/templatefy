module.exports = function(template, data, opts) {
  var regex,
      lDel,
      rDel,
      delLen,
      lDelLen,
      delimiter,
      // For escaping strings to go in regex
      regexEscape = /([$\^\\\/()|?+*\[\]{}.\-])/g;

  opts = opts || {};

  delimiter = opts.delimiter || '{%%}';
  delLen = delimiter.length;
  lDelLen = Math.ceil(delLen / 2);
  // escape delimiters for regex
  lDel = delimiter.substr(0, lDelLen).replace(regexEscape, "\\$1");
  rDel = delimiter.substr(lDelLen, delLen).replace(regexEscape, "\\$1") || lDel;

  // construct the new regex
  regex = new RegExp(lDel + "[^" + lDel + rDel + "]+" + rDel, "g");

  return template.replace(regex, function (placeholder) {
    var key = placeholder.slice(lDelLen, -lDelLen),
        keyParts = key.split("."),
        val,
        i = 0,
        len = keyParts.length;

    if (key in data) {
      // need to be backwards compatible with "flattened" data.
      val = data[key];
    }
    else {
      // look up the chain
      val = data;
      for (; i < len; i++) {
        if (keyParts[i] in val) {
          val = val[ keyParts[i] ];
        } else {
          return placeholder;
        }
      }
    }
    return val;
  });
}
