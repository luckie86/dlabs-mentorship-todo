var express = require('express');
var router = express.Router();

var dbHelper = require('../../../private/DBHelper');
var securityHelper = require('../../../private/securityHelper');
var JWTHelper = require('../../../private/JWTHelper');

/* POST user. */
router.post('/', function(req, res, next) {
    let data = req.body;
    let timeStamp = new Date(Date.now());
    let hashedPassword = securityHelper.createHash(data.password);
    

    if (data) {
        dbHelper.updateModel({ id: data.id, user: data.userName, password: hashedPassword, timestamp: timeStamp}, null);
        let userToken = {
            userId: data.id,
            userName: data.userName,
        }
        
        JWTHelper.createJWTwithPromise(userToken)
            .then((token) => {
                res.status(200).send(token);
            })
            .catch((err)=> {
                res.status(400).send(err);
            });
    }

});

module.exports = router;
