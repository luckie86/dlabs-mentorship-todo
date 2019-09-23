var express = require('express');
var router = express.Router();

var dbHelper = require('../../../private/DBHelper');
var securityHelper = require('../../../private/securityHelper');
var JWTHelper = require('../../../private/JWTHelper');

/* POST user. */
router.post('/', function(req, res, next) {
    var data = req.body;
    var timeStamp = new Date(Date.now());
    securityHelper.createBcryptHash(data.password).then((hashedPassword) => {
        if (data) {
            let newUserId = randomId();
            dbHelper.updateModel({id: newUserId, user: data.userName, password: hashedPassword, timestamp: timeStamp}, null);
            let userToken = {
                userId: newUserId,
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
    }).catch((err) => {
        console.log(err);
    });
    
    function randomId () {
        return Math.floor(Math.random()*1000);
    }

});

module.exports = router;
