'use strict';

var users = require("./users.js"),
    validator = require("./validator.js"),
    coreHelper = require("./../lib/coreHelper.js")
;

module.exports.handler = function(event, context) {
  var errors = {};
  var id = event.id;
  var body = event.body;


  var successCallback = function(data){
      return context.done(null, {
        data: data
      });
  };

  var errorCallback = function(error){
    return context.done(null,{
      errors: error
    });
  };

  // delegate HTTP methods to CRUD actions
  switch(event.httpMethod){
    case "GET":
      if(id){
        errors = validator.validateId(id,errors);
        if(coreHelper.isObjectEmpty(errors)){
          users.read(id,successCallback,errorCallback);
        }
      } else {
        // if no id provided, return all users
        users.readAll(successCallback,errorCallback);
      }
      break;
    case "POST":
      errors = validator.validateUser(body,errors);
      if(coreHelper.isObjectEmpty(errors)){
        users.create(validator.sanitizeUser(body),successCallback,errorCallback);
      }
      break;
    case "PUT":
      errors = validator.validateId(id,errors);
      if(coreHelper.isObjectEmpty(errors)){
        users.update(id,validator.sanitizeUser(body),successCallback,errorCallback);
      }
      break;
    case "DELETE":
      errors = validator.validateId(id,errors);
      if(coreHelper.isObjectEmpty(errors)){
        users.delete(id,successCallback,errorCallback);
      }
      break;
    default :
      return context.fail(new Error("Invalid HTTP Method"));
      break;
  }

  if(!coreHelper.isObjectEmpty(errors)){
    errorCallback(errors);
  }
};