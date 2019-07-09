var express = require('express');
var router = express.Router();

var dbHelper = require('../../private/DBHelper');

/* GET user. */
router.get('/', function(req, res, next) {
    var data = req.body;
    var users = dbHelper.getUsers();
    var user = users.find((user) => user.id === data.id);
    res.status(200).send(user);
});


/* GET user with id. */
router.get('/:id', function(req, res, next) {
    var id = parseInt(req.params.id, 10);
    if (!typeof id == "number" || id !== null) { 
        var users = dbHelper.getUsers();
        let user = users.find((user) => user.id === id) || {};
        return res.status(200).send(user);
    } else {
        res.sendStatus(404);
    }
});

// POST user
router.post('/', function(req, res, next) {
    var data = req.body;
    dbHelper.updateModel({id: data.id, todo: data.text, userId: data.userId}, null);
    res.status(200).send({id: data.id, todo: data.text, userId: data.userId});
});

module.exports = router;
