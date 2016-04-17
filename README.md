### RESTful
The RESTful API is live and can be used as follows:


```
Get all users
GET https://7l1yntxte9.execute-api.eu-west-1.amazonaws.com/dev/users

Get user by id
GET https://7l1yntxte9.execute-api.eu-west-1.amazonaws.com/dev/users/{id}

Update user by id
PUT https://7l1yntxte9.execute-api.eu-west-1.amazonaws.com/dev/users/{id}

Create user
POST https://7l1yntxte9.execute-api.eu-west-1.amazonaws.com/dev/users

Delete user by id
DELETE https://7l1yntxte9.execute-api.eu-west-1.amazonaws.com/dev/users/{id}
```

The request Header should include:
```
Content-Type:application/json
```

N.B. the response HTTP will always be 200. For failed requests look for `errors` property in the returned JSON object

PostMan collection with all RESTful calls can be imported from the `postman_collection` file in the root of the project

## Technology stack

The API was build using the serverless.js plugin, which is used here to manage and deploy AWS Lambdas and related resources

Data is stored in DynamoDB

Unit tests can be run using Mocha.js

## Install serverless.js

The framework used is serverless - excellent documentation can be found here: http://docs.serverless.com/. Basic commands are:

Initialize project
```
sls project init
```

Install node.js dependencies
```
npm install
```

Add the following to the `s-variables-common.json` (you will need to create a DynamoDB table with `id` primary key)
```
"dynamoDbTable": "holiday-extras-users"
```

Run Lambda function locally (will pass event.json as event)
```
sls function run [functionName]
```

Deploy Lambda function to AWS
```
sls function deploy [functionName]
```

Deploy endpoint (AWS API Gateway) to AWS
```
sls endpoint deploy [endpointName[
```


## Run Mocha unit tests 
```
npm test
```
N.B. the command is defined in `package.json` inside `scripts:{}`