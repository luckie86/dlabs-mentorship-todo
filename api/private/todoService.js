// var fs = require('fs');

// class TodoService {

//     constructor () {
//         this.obj = {
//             table: [

//             ]
//         };
//     }
    
//     saveTodo (id, todo) {
//         var todoObject = {id: id, todo: todo};
//         this.obj.table.push(todoObject);
//         var json = JSON.stringify(this.obj);
//         fs.writeFile('TODO.json', json, 'utf8', function(err) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log("Todo saved.");
//             }
//         });
//     }

//     getTodo (id, callback) {
//         fs.readFile('TODO.json', 'utf8', function readFileCallback(err, data) {
//             if (err) {
//                 console.log(err);
//             } else {
//             var obj = JSON.parse(data);
//             obj.table.forEach(todo => {
//                 if(todo.todo == currentTodoName && id == currentTodoId) {
//                     callback(todo);
//                     return todo;
//                 }
//             });
//         }});
//     }

//     deleteTodo (id) {
//         fs.readFile('TODO.json', 'utf8', function readFileCallback(err, data) {
//             if (err) {
//                 console.log(err);
//             } else {
//             var obj = JSON.parse(data);
//             obj.table.forEach(todo => {
//                 if(id == currentTodoId) {
//                     callback(todo);
//                     return todo;
//                 }
//             });
//         }});
//     }

//     editTodo (id) {
//         fs.readFile('TODO.json', 'utf8', function readFileCallback(err, data){
//             if (err) {
//                 console.log(err);
//             } else {
//             var obj = JSON.parse(data);
//             obj.table.forEach(todo => {
//                 if(id == currentTodoId) {
//                     callback(todo);
//                     return todo;
//                 }
//             });
//         }});
//     }

// }

// module.exports = TodoService;
