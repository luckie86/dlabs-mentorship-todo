var express = require('express');
var router = express.Router();

var dbHelper = require('../../private/DBHelper');
var JWTHelper = require('../../private/JWTHelper');

router.use('/', function(req,res,next){
    if (req.headers.token) {
        // use JWT HELPER TO FIND OUT IF USER HAS RIGHT TOKEN
        var decoded = JWTHelper.decodeJWT(req.headers.token);
        if(decoded) {
            console.log(decoded);
            next()
        }
    }
    next("no token found"); 
});

/* GET todo. */
router.get('/', function(req, res, next) {
    var data = req.body;
    var todos = dbHelper.getTodos();
    var todo1 = todos.find((todo) => todo.id === data.id) || {}
    res.status(200).send(todo1.text);
});

//  Save todo
router.post('/save', function (req, res, next) {

    // naredi save

});

// Edit todo with id
router.post('/edit/:id', function(req, res, next) {
    let id = parseInt(req.params.id, 10);
    let newTodo = req.body;
    dbHelper.editTodo(id, newTodo);
    return res.status(200).send({message: "successfuly edited"});
});

// Delete todo with id
router.get('/delete/:id', function(req, res, next) {
    let id = parseInt(req.params.id, 10);
    dbHelper.deleteTodo(id);
    return res.status(200).send({message: "successfuly deleted"});
});

/* GET todo. */
router.get('/:id', function(req, res, next) {
    let id = parseInt(req.params.id, 10);
    if (!typeof id == "number" || id !== null) {
        let todos = dbHelper.getTodos();
        let todo = todos.find((todo) => todo.id === id) || {};
        return res.status(200).send(todo);
    } else {
        res.sendStatus(404);
    }
});

// POST todo
router.post('/', function(req, res, next){
    let data = req.body;
    dbHelper.updateModel(null, {id: data.id, todo: data.text, userId: data.userId});
    res.status(200).send({id: data.id, todo: data.text, userId: data.userId});
});

module.exports = router;
