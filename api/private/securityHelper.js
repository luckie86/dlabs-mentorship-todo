var fs = require('fs');
var crypto = require('crypto');


class SecurityHelper {

    createHash (password) {
        let hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
        return hashedPassword;
    }

}

module.exports = new SecurityHelper();
