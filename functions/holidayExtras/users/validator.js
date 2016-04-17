var MISSING_PROPERTY = "Property is missing",
    REQUIRED_FIELDS = ["email","forename","surname"],
    VALID_FIELDS = REQUIRED_FIELDS // there are no optional fields at the moment
;

/**
 * Validate id property
 * @param id
 * @param errors
 * @returns {*}
 */
var validateId = function(id, errors){
  var idErrors = [];
  if(!id){
    idErrors.push(MISSING_PROPERTY);
  } else {
    // check if correct UUID  (RFC4122)
    if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)){
      idErrors.push("The integer must be a valid UUID format")
    }
  }

  if(idErrors.length > 0){
    errors.id = idErrors;
  }

  return errors;
};

module.exports.validateId = validateId;

/**
 * @param user
 * @param errors
 * @returns {*}
 */
var validateUser = function(user,errors){
  for(var i=0;i<REQUIRED_FIELDS.length;i++) {
    if (!user.hasOwnProperty(REQUIRED_FIELDS[i])) {
      errors[REQUIRED_FIELDS[i]] = [MISSING_PROPERTY];
    } else if(!(typeof user[REQUIRED_FIELDS[i]] === 'string' || user[REQUIRED_FIELDS[i]] instanceof String)){
      errors[REQUIRED_FIELDS[i]] = ["Property must be a string"];
    }
  }
  return errors;
};

module.exports.validateUser = validateUser;


/**
 * Delete all non-valid properties
 * @param user
 * @returns {*}
 */
var sanitizeUser = function(user){
  Object.keys(user).forEach(function(key) {
    if(!(VALID_FIELDS.indexOf(key) > -1)){
      delete user[key];
    }
  });
  return user;
};

module.exports.sanitizeUser = sanitizeUser;
