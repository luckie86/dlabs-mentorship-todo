var jwt = require('jsonwebtoken');
var securityHelper = require('../private/securityHelper');

var privateKey = "lukabrinar";
var hashedPrivateKey = securityHelper.createHash(privateKey);

class JWTHelper {

    createJWT (data, callback) {
        jwt.sign(data, hashedPrivateKey, { algorithm: 'HS256' }, function(err, token) {
            if (err) {
                console.log(err);
            } else {
                console.log(token);
                return callback(token);
            }
        });
    }

    decodeJWT (token) {
        jwt.verify(token, hashedPrivateKey, function (err, decoded) {
            if (err) {
                console.log(err);
            } else {
                console.log(decoded);
                return decoded;
            }
        });
    }

}

module.exports = new JWTHelper();
