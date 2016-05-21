Templatefy = require("..");

module.exports = function(expect){
    describe('#api', function() {
        it('should throw an Exception (Input stream error)', function() {
             expect(Templatefy.parse).to.throw('Input stream error');
        });
    });
}
