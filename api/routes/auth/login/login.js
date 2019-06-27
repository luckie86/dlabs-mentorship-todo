var express = require('express');
var router = express.Router();
var UsersService = require('../../../private/usersService');

var usersService = new UsersService();

/* POST user and check password. */
router.post('/', function(req, res, next) {
    var userName = req.body.userName;
    var password = req.body.password;
    var checkUserFromDB;
    usersService.getUser(userName, password, function(user) {
        checkUserFromDB = user;
        if (checkUserFromDB.user == userName && checkUserFromDB.password == password) {
            res.sendStatus(200);    
        } else {
            res.sendStatus(401);
        }     
    });
});

module.exports = router;
