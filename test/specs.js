const expect = require("chai").expect;

describe('Templatefy', function() {
    require('./spec-cli')(expect);
    require('./spec-api')(expect);
});
