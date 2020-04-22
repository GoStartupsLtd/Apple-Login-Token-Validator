const jwt = require('jsonwebtoken');
const jwks = require('jwks-rsa');

function getApplePublicKey(keyId){
  const jwksClient = jwks({
    strictSsl: true, // Default value
    jwksUri: 'https://appleid.apple.com/auth/keys'
  });

  const promise = new Promise((resolve, reject) => {
    jwksClient.getSigningKey(keyId, function(err, key) {
      if (err) {
        reject(err);
      }
      const signingKey = key.getPublicKey();
      resolve(signingKey);
    });
  });
  return promise;
}

exports.verifyToken = async function(token, appIds) {
  console.log("This is a message from the demo package");
  const jwtOptions = {
        algorithms: ['RS256'],
        audience: appIds,
        complete: true,
        issuer: 'https://appleid.apple.com',
        ignoreExpiration: false
      };
      
    const jwtTokenDecoded = jwt.decode(token, { complete: true });
    const appleKeyId = jwtTokenDecoded['header'].kid;
    
    const promise = new Promise((resolve, reject) => {
        const applePubKey = getApplePublicKey(appleKeyId).then(function(applePubKey) {
        const decodedToken = jwt.verify(token, applePubKey, jwtOptions);
        resolve(decodedToken.payload)
        }, function(error){
          reject(error)
        })
    })
    return promise
}
