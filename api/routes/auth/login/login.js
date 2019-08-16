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
    let user = users.find((user) => user.user === userName);
    if (user) {
        securityHelper.compareHash(password, user.password)
        .then((isPasswordValid) => {
            if(isPasswordValid) {
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
                // return res.sendStatus(401);
                throw "invalid login";

            }
    
        })
        .catch((err)=>{
            console.log(err);
            res.status(400).send(err);
        })
        

    } else {
        res.sendStatus(401);
    }
});

module.exports = router;
