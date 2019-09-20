var express = require('express');
var router = express.Router();

var uuidv4 = require("uuid/v4");

var dbHelper = require('../../private/DBHelper');
var JWTHelper = require('../../private/JWTHelper');

router.use('/', function(req,res,next){ 
    // return next();
    if (req.headers.token) {
        JWTHelper.decodeJWTwithPromise(req.headers.token)
            .then((token) => {
                req.decodedToken = token;
                next();
            })
            .catch((err)=> {
                next(err);
            });
    } else {
        next("no token found");
    }
     
});

/* GET todos. */
router.get('/', function(req, res, next) {
    if (req.decodedToken) {
        var todos = dbHelper.getTodos();
        var todosFromCurrentUser = todos.filter((todo)=>{return todo.userId === req.decodedToken.userId});
        res.status(200).send(todosFromCurrentUser);
    } else {
        res.sendStatus(401);
    }
    
});

/* GET todo. */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    var todos = dbHelper.getTodos();
    var todo1 = todos.find((todo) => todo.uuid === id && req.decodedToken.userId === req.decodedToken.uuid);
    res.status(200).send(todo1);
});

/* SAVE TODO. */
router.post('/save', function (req, res, next) {
    var currentUserId = req.decodedToken.userId;
    var todoUUID = uuidv4();
    var newTodo = req.body.text;
    var save = dbHelper.saveTodo(todoUUID, newTodo, currentUserId);
    if (save) {
        return res.status(200).send({message: "Todo sucesfully saved"});
    }
     return res.sendStatus(400);
});

// Edit todo with id
router.put('/edit/:id', function(req, res, next) {
    var currentUserId = req.decodedToken.userId;
    var uuid = req.params.id;
    var newTodo = req.body;
    dbHelper.editTodo(uuid, newTodo.text, currentUserId);
    var todoToSend = dbHelper.getTodo(uuid);
    return res.status(200).send(todoToSend);
});

// Delete todo with id
router.delete('/delete/:id', function(req, res, next) {
    var id = req.params.id
    dbHelper.deleteTodo(id);
    return res.status(200).send({message: "successfuly deleted"});
});

/* GET todo. */
router.get('/edit/:id', function(req, res, next) {
    var uuid = req.params.id;
    var todo = dbHelper.getTodo(uuid);
    return res.status(200).send(todo);
});

module.exports = router;
