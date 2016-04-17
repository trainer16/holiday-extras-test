### Install serverless.js

The framework used is serverless - excellent documentation can be found here: http://docs.serverless.com/. Basic commands are:

Initialize project
```
sls project init
```

Install node.js dependencies
```
npm install
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



### Lambda best practice:

* all business logic should be modularized. `handler.js` should only call functions from other modules
* Lambda-specific functions should go into `functions.js`, which should be in the same directory as the `handler.js`
* functions that are shared by Lambdas should go into `functions/{projectName}/lib` (N.B. make sure your handler property in `s-function.json` is `{functionName}/handler.handler.js`)

---


### Run Mocha test 
```
npm test
```
N.B. the command is defined in `package.json` inside `scripts:{}`