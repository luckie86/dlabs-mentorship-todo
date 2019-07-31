var jwt = require('jsonwebtoken');
var securityHelper = require('../private/securityHelper');

var privateKey = "lukabrinar";
var hashedPrivateKey = securityHelper.createHash(privateKey);

class JWTHelper {

    decodeJWTwithPromise(token) {
        return new Promise (function (resolve, reject) {
            jwt.verify(token, hashedPrivateKey, function (err, decoded) {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        })
        
    }


    createJWTwithPromise(data) {
        return new Promise(function (resolve, reject) {
            jwt.sign(data, hashedPrivateKey, { algorithm: 'HS256' }, function (err, token) {
                if (err) {
                    reject(err);
                } else {
                    resolve(token);
                }
            })

        });
    }

}

module.exports = new JWTHelper();
