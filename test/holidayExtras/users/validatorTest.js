var validator = require('../../../functions/holidayExtras/users/validator.js'),
    should = require('should')
;

describe('Testing id validation in validator', function() {
  it('Should return no errors for correct id', function() {
    var actualResult = validator.validateId("2eb160a0-04bf-11e6-a623-47efa0b60a54",{});
    should(actualResult).be.empty();
  });

  it('Should return error when id is missing', function() {
     var actualResult = validator.validateId(null,{});
     actualResult.should.have.property("id");
     should(actualResult.id[0]).be.type("string");
  });

  it('Should return error when id is not of correct UUID format', function() {
    var actualResult = validator.validateId("wrong-id",{});
    actualResult.should.have.property("id");
    should(actualResult.id[0]).be.type("string");
  });
});


describe('Testing user validation in validator', function() {
  it('Should return no errors for correct user', function() {
    var userPositive = {
        "email":"a",
        "forename":"a",
        "surname":"a"
    };
    var actualResult = validator.validateUser(userPositive,{});
    should(actualResult).be.empty();
  });

  var userNegativeMissing = {
    "email":"a",
    "surname":"a"
  };

  it('Should return error when one of the required fields is missing', function() {
    var actualResult = validator.validateUser(userNegativeMissing,{});
    actualResult.should.have.property("forename");
    should(actualResult.forename[0]).be.type("string");
  });

  var userNegativeNonString = {
    "email":"a",
    "forename":"a",
    "surname":2
  };

  it('Should return error when one of the required fields is a non-string', function() {
    var actualResult = validator.validateUser(userNegativeNonString,{});
    actualResult.should.have.property("surname");
    should(actualResult.surname[0]).be.type("string");
  });
});

describe('Testing sanitizing user in validator', function() {
  var userClean = {
    "email":"a",
    "forename":"a",
    "surname":"a"
  };

  it('Should return same object when no redundant properties are present', function() {
    var actualResult = validator.sanitizeUser(userClean,{});
    should(actualResult).be.eql(userClean);
  });

  var userDirty = {
    "email":"a",
    "forename":"a",
    "surname":"a",
    "foo": "bar"
  };

  it('Should sanitiez user object when redundant properties are present', function() {
    var actualResult = validator.sanitizeUser(userDirty,{});
    should(actualResult).be.eql(userClean);
  });
});