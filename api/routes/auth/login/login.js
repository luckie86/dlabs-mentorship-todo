var express = require('express');
var router = express.Router();
var dbHelper = require('../../../private/DBHelper');
var securityHelper = require('../../../private/securityHelper');
var JWTHelper = require('../../../private/JWTHelper')

/* POST user and check password. */
router.post('/', function(req, res, next) {
    let userName = req.body.userName;
    let password = req.body.password;
    let users = dbHelper.getUsers();
    let hashedPassword = securityHelper.createHash(password);
    let user = users.find((user) => user.user === userName && user.password === hashedPassword);
    if (user) {
        let userToken = {
            userId: user.id,
            userName: user.user,
        }
        
        JWTHelper.createJWTwithPromise(userToken)
            .then((token) => {
                res.status(200).send(token);
            })
            .catch((err)=> {
                res.status(400).send(err);
            });


    } else {
        res.sendStatus(401);
    }
});

module.exports = router;
