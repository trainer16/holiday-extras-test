var AWS = require('aws-sdk'),
    dynamoDBDoc = new AWS.DynamoDB.DocumentClient({region: process.env.SERVERLESS_REGION}),
    uuid = require('uuid'),
    coreHelper = require("./../lib/coreHelper.js")
;

/**
 * Create new user
 * @param user
 * @param successCallback
 * @param errorCallback
 */
var create =  function(user,successCallback,errorCallback){
  // generate timestamp-based UUID
  user.id = uuid.v1();
  // add created timestamp
  user.created = coreHelper.getFormattedDayString(new Date());

  var params = {
    TableName: process.env.DYNAMO_DB_TABLE,
    Item: user
  };

  dynamoDBDoc.put(params, function(error, data) {
    if (error) {
      errorCallback(error);
    } else {
      successCallback(user);
    }
  });
};

module.exports.create = create;

/**
 * Read user by ID.
 * @param id
 * @param successCallback
 * @param errorCallback
 */
var read =  function(id,successCallback,errorCallback){
  var params = {
    TableName: process.env.DYNAMO_DB_TABLE,
    Key: {
      "id":id
    }
  };

  dynamoDBDoc.get(params, function(error, data) {
    if (error) {
      errorCallback(error);
    } else {
      successCallback(data);
    }
  });
};

module.exports.read = read;

/**
 * Get all users
 * @param successCallback
 * @param errorCallback
 */
var readAll =  function(successCallback,errorCallback){
  var params = {
    TableName: process.env.DYNAMO_DB_TABLE
  };

  dynamoDBDoc.scan(params, function(error, data) {
    if (error) {
      errorCallback(error);
    } else {
      successCallback(typeof data.Items === "undefined"?[]:data.Items);
    }
  });
};

module.exports.readAll = readAll;

/**
 * Update user's properties
 * @param id
 * @param user
 * @param successCallback
 * @param errorCallback
 */
var update =  function(id,user,successCallback,errorCallback){

  var attributeUpdates = {};
  Object.keys(user).forEach(function(key) {
    attributeUpdates[key] = {
      Action: 'PUT',
      Value: user[key]
    };
  });

  var params = {
    TableName: process.env.DYNAMO_DB_TABLE,
    Key: {
      "id":id
    },
    AttributeUpdates: attributeUpdates,
    ReturnValues:"ALL_NEW"
  };

  dynamoDBDoc.update(params, function(error, data) {
    if (error) {
      errorCallback(error);
    } else {
      successCallback(typeof data.Attributes === "undefined"?{}:data.Attributes);
    }
  });
};

module.exports.update = update;

/**
 * Delete user by ID.
 * @param id
 * @param successCallback
 * @param errorCallback
 */
var deleteUser =  function(id,successCallback,errorCallback){
  var params = {
    TableName: process.env.DYNAMO_DB_TABLE,
    Key: {
      "id":id
    }
  };

  dynamoDBDoc.delete(params, function(error, data) {
    if (error) {
      errorCallback(error);
    } else {
      successCallback({id:id});
    }
  });
};

module.exports.delete = deleteUser;