var fs = require('fs');
var crypto = require('crypto');
var bcrypt = require('bcrypt');

var saltRounds = 10;


class SecurityHelper {

    createHash (password) {
        let hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
        return hashedPassword;
    }

    createBcryptHash (password) {
        return bcrypt.hash(password, saltRounds)
    }   

    compareHash (userInputPassword, hashFromDB) {
        return bcrypt.compare(userInputPassword, hashFromDB);
    }

}

module.exports = new SecurityHelper();
