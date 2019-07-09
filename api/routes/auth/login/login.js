var express = require('express');
var router = express.Router();
// var UsersService = require('../../../private/usersService');
var dbHelper = require('../../../private/DBHelper');

// var usersService = new UsersService();

/* POST user and check password. */
router.post('/', function(req, res, next) {
    var userName = req.body.userName;
    var password = req.body.password;
    var userId = req.body.id;
    
    // usersService.getUser(userName, password, function(user) {
    //     checkUserFromDB = user;
    //     if (checkUserFromDB.user == userName && checkUserFromDB.password == password) {
    //         res.sendStatus(200);    
    //     } else {
    //         res.sendStatus(401);
    //     }     
    // });

    let users = dbHelper.getUsers();
    let user = users.find((user) => user.id === userId && user.user === userName && user.password === password) || {};
    if (user) {
        res.status(200).send(user);
    } else {
        res.sendStatus(401);
    }
});

module.exports = router;
