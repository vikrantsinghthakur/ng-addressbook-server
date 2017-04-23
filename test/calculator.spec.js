var assert = require('assert');
var calc = require('../lib/calculator');

describe("Calculator tests", function(){
    it("should add two numbers", function(){
        var expected = 5;
        var calculated = calc.add(2,3);
        assert.equal(expected, calculated);
    });
});