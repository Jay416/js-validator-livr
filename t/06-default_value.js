var LIVR = require('../lib/LIVR');
var assert = require('chai').assert;

LIVR.Validator.registerDefaultRules({
    my_default_value: function(defaultValue) {
        return function(value, params, outputArr) {
            if (value === undefined || value === null || typeof value === 'object' || value === '' ) outputArr.push(defaultValue);
        };
    }
});

test('Validate data with empty fields', function() {
    var validator = new LIVR.Validator({
        word1: [{'my_default_value': 'defaultValue'}],
        word2: [{'my_default_value': 'defaultValue'}],
        word3: [{'my_default_value': 'defaultValue'}]
    });

    var output = validator.validate({
        word1: null,
        word2: 'wordTwo'
    });

    assert.deepEqual( output, {
        word1: 'defaultValue',
        word2: 'wordTwo',
        word3: 'defaultValue'
    }, 'Should appluy changes to values' );
});
