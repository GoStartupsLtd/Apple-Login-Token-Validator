# Login with Apple Token Validator
During a Sign up with Apple from a mobile client the backend needs to receive a token and then to verify that the token is valid. The process is not as simple therefore I am creating this package. 

## Installation 
```bash
npm install login-apple-token-validator
```



## Use of framework
```js
var validator = require('login-apple-token-validator')

const appIds = ['<Your application ID (Bundle Identificator)>']
const token = '<Token received from Sign up with Apple>'

validator.verifyToken(token, appIds).then(function(decodedJWTPayload){
  console.log(decodedJWTPayload) // will return parsed JWT payload from Apple's token
}, function(error) {
  console.log(error) // will show an error
})
```



## Backend implementation guidelines
1. Create an endpoint to receive the `token` provided by Apple
2. Use the framework to validate if the token is valid or not. If the token is valid continue to step 3, If the token is invalid return an error response. 
3. The following fields from `decodedJWTPayload` needs to be stored in your DB:
	1. `email` - email of the user. As it may be a private email it is recommended to use the property below to identify a user.
	2. `sub` - JWT subject, the unique user ID provided to you by Apple. Use this property to identify the user as the `email` property may change. 
4. If the user is already available in your system proceed with your standard Login procedure, else proceed with your register procedure.

## License - MIT
## Contribution
Feel free to contribute and extend the current project. The standard git procedures need to be followed:
- Create a PR
- Explain the changes that your are applying
- Rebase on the latest master if needed
