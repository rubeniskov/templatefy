const fs = require('fs')
      path = require('path'),
      Templatefy = require('../..');

Templatefy.parse({
    angular: {
        module: {
            name: 'testName'
        }
    },
}'./template-element.html', './template-element.js');
