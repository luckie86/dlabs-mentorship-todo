var express = require('express');
var router = express.Router();
// var UsersService = require('../../../private/usersService');
var dbHelper = require('../../../private/DBHelper');

// var usersService = new UsersService();

/* POST user. */
router.post('/', function(req, res, next) {
    var data = req.body;
    var timeStamp = new Date(Date.now());
    dbHelper.updateModel({ id: data.id, user: data.userName, password: data.password, timestamp: timeStamp}, null);
    res.sendStatus(200);
});

module.exports = router;
