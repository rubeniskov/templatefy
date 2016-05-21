const fs = require('fs')
      path = require('path'),
      Templatefy = require('../..');

Templatefy.parse('./template-element.html', './template-element.js');


Templatefy.parse({
    var: 'exampleVar'
},'./template-element.html', './template-element-with-var.js');

Templatefy.parse({
    global: 'exampleGlobal'
},'./template-element.html', './template-element-with-global.js');

Templatefy.parse({
    exports: true
},'./template-element.html', './template-element-with-exports.js');

Templatefy.parse({
    scope: true
},'./template-element.html', './template-element-with-scope.js');


Templatefy.parse({
    scope: true,
    exports: true,
    global: 'exampleGlobalVarName:exampleGlobalPropertyName',
    var: 'exampleVar'
},'./template-element.html', './template-element-with-full.js');
