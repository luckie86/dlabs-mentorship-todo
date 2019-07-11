var jwt = require('jsonwebtoken');
var securityHelper = require('../private/securityHelper');

var privateKey = "lukabrinar";
var hashedPrivateKey = securityHelper.createHash(privateKey);

class JWTHelper {

    createJWT (data) {
        var token = jwt.sign(data, hashedPrivateKey);
        return token;
    }

    decodeJWT (token) {
        var decodedJWT = jwt.decode(token, hashedPrivateKey);
        return decodedJWT;
    }

}

module.exports = new JWTHelper();
