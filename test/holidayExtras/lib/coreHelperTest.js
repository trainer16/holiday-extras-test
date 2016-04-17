var coreHelper = require('../../../functions/holidayExtras/lib/coreHelper.js'),
  should = require('should')
;

describe('Testing the isObjectEmpty in coreHelper', function() {
  it('Should identify empty object', function() {
    should(coreHelper.isObjectEmpty({})).be.exactly(true);
  });

  it('Should identify when object has a property', function() {
    should(coreHelper.isObjectEmpty({errors:{}})).be.exactly(false);
  });
});

describe('Testing the getFormattedDayString in coreHelper', function() {
  it('Should format the date correctly', function() {
    should(coreHelper.getFormattedDayString(new Date("2000-01-01"))).be.exactly("2000-01-01T00:00:00.000Z");
  });

  it('Should format now', function() {
    should(coreHelper.getFormattedDayString(new Date())).be.type("string");
  });
});


