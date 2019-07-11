var express = require('express');
var router = express.Router();
// var UsersService = require('../../../private/usersService');
var dbHelper = require('../../../private/DBHelper');
var securityHelper = require('../../../private/securityHelper');
// var usersService = new UsersService();

/* POST user and check password. */
router.post('/', function(req, res, next) {
    var userName = req.body.userName;
    var password = req.body.password;
    console.log(req.body.id)
    var userId = parseInt(req.body.id);
    
    // usersService.getUser(userName, password, function(user) {
    //     checkUserFromDB = user;
    //     if (checkUserFromDB.user == userName && checkUserFromDB.password == password) {
    //         res.sendStatus(200);    
    //     } else {
    //         res.sendStatus(401);
    //     }     
    // });

    let users = dbHelper.getUsers();
    let hashedPassword = securityHelper.createHash(password);
    console.log(userName);
    console.log(userId);
    console.log(hashedPassword);
    let user = users.find((user) => user.user === userName && user.password === hashedPassword);
    if (user) {
        res.status(200).send(user);
    } else {
        res.sendStatus(401);
    }
});

module.exports = router;
