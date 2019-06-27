var express = require('express');
var router = express.Router();
var UsersService = require('../../../private/usersService');

var usersService = new UsersService();

/* POST user. */
router.post('/', function(req, res, next) {
    var data = req.body;
    var timeStamp = new Date(Date.now());
    usersService.saveUser(data.id, data.userName, data.password, timeStamp);
    res.sendStatus(200);
});

module.exports = router;
