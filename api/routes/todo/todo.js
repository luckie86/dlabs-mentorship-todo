var express = require('express');
var router = express.Router();

var dbHelper = require('../../private/DBHelper');

/* GET todo. */
router.get('/', function(req, res, next) {
    var data = req.body;
    var todos = dbHelper.getTodos();
    var todo1 = todos.find((todo) => todo.id === data.id)
    res.status(200).send(todo1.text);
});

router.get('/edit', function(req, res, next) {
    
    return res.status(200).send({msg:"edit"});
});

router.get('/delete/:id', function(req, res, next) {
    var id = parseInt(req.params.id, 10);
    dbHelper.deleteTodo(id);
    return res.status(200).send({message: "successfuly deleted"});
});

/* GET todo. */
router.get('/:id', function(req, res, next) {
    var id = parseInt(req.params.id, 10);
    if (!typeof id == "number" || id !== null) {
        var todos = dbHelper.getTodos();
        var todo = todos.find((todo) => todo.id === id) || {};
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