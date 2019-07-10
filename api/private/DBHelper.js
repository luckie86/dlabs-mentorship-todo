var fs = require('fs');

class DBHelper {

    constructor() {
        this.model = null;
        this.loadModel();
    }

    loadModel() {
        fs.readFile('DB.json', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
           }
            this.model = JSON.parse(data);
        });
    }
    
    setModel (model) {
        this.model = model;
    }

    getModel () {
        if (!this.model) {
            fs.readFile('DB.json', 'utf8', (err, data) => {
                if (err) {
                    console.log(err);
                }
                this.model = JSON.parse(data);
                return this.model;
            });
        }
        return this.model;
    }

    saveModel (model) {
        let json = JSON.stringify(model);
        fs.writeFile('DB.json', json, 'utf8', (err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log(res);
            }
                
        });
    }

    updateModel (user, todo) {
        let currentModel = this.model;
        if (user) {
            currentModel.users.push(user)
        } else if (todo) {
            currentModel.todos.push(todo);
        } 
        this.saveModel(currentModel);
    }

    getUsers () {
        if (!this.model) {
            this.getModel();
            return this.model.users;
        } else {
            return this.model.users;
        }
    }

    getTodos () {
        if (!this.model) {
            this.getModel();
            return this.model.todos;
        } else {
            return this.model.todos;
        }    }

    deleteTodo (index) {
        let currentModel = this.model;
        let newTodos = currentModel.todos.filter((item) => item.id !== index);       
        currentModel.todos = newTodos;
        this.saveModel(currentModel);    
    }

    editTodo (index, newTodo) {
        let currentModel = this.model;
        let todoToEdit = currentModel.todos.filter((item) => item.id === index);
        currentModel.todos.splice(index, 1);
        todoToEdit[0].todo = newTodo.newTodo;
        currentModel.todos.push(todoToEdit[0]);
        this.saveModel(currentModel);
    }

}

module.exports = new DBHelper();
