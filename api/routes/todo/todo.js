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
    // ne bo potrebno več parseInt ko implementiram UUID
    let id = req.params.id;
    var todos = dbHelper.getTodos();
    var todo1 = todos.find((todo) => todo.id === id) || {}
    console.log(req.decodedToken);
    res.status(200).send(todo1);
});

/* SAVE TODO. */
router.post('/save', function (req, res, next) {
    var currentUserId = req.decodedToken.userId;
    var todoUUID = uuidv4();
    var newTodo = req.body.todo;
    dbHelper.saveTodo(todoUUID, newTodo, currentUserId);
    return res.status(200).send({message: "Todo sucesfully saved"});
});

// Edit todo with id
router.post('/edit/:id', function(req, res, next) {
    let id = req.params.id
    let newTodo = req.body;
    dbHelper.editTodo(id, newTodo);
    return res.status(200).send({message: "successfuly edited"});
});

// Delete todo with id
router.get('/delete/:id', function(req, res, next) {
    let id = req.params.id
    dbHelper.deleteTodo(id);
    return res.status(200).send({message: "successfuly deleted"});
});

/* GET todo. */
router.get('/:id', function(req, res, next) {
    let id = req.params.id
    if (!typeof id == "number" || id !== null) {
        let todos = dbHelper.getTodos();
        let todo = todos.find((todo) => todo.id === id) || {};
        return res.status(200).send(todo);
    } else {
        res.sendStatus(404);
    }
    console.log("kr neki");
    res.sendStatus(200);
});

// POST todo
router.post('/', function(req, res, next){
    let data = req.body;
    dbHelper.updateModel(null, {id: data.id, todo: data.text, userId: data.userId});
    res.status(200).send({id: data.id, todo: data.text, userId: data.userId});
});

module.exports = router;
