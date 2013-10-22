var grunt = require('grunt');

exports.bliss = {
  compile: function(test) {
    'use strict';

    test.expect(1);

    var actual = grunt.file.read('tmp/bliss.html');
    var expected = grunt.file.read('test/expected/bliss.html');
    test.equal(expected, actual, 'should compile bliss templates to html');

    test.done();
  }
};