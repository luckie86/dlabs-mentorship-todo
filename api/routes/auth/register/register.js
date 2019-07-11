var express = require('express');
var router = express.Router();

var dbHelper = require('../../../private/DBHelper');
var securityHelper = require('../../../private/securityHelper');

/* POST user. */
router.post('/', function(req, res, next) {
    let data = req.body;
    let timeStamp = new Date(Date.now());
    let hashedPassword = securityHelper.createHash(data.password);
    dbHelper.updateModel({ id: data.id, user: data.userName, password: hashedPassword, timestamp: timeStamp}, null);
    return res.sendStatus(200);
});

module.exports = router;
