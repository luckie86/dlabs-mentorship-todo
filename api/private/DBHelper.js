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
        }    
    }

    deleteTodo (uuid) {
        let currentModel = this.model;
        let newTodos = currentModel.todos.filter((todo) => todo.uuid !== uuid);       
        currentModel.todos = newTodos;
        this.saveModel(currentModel);    
    }

    editTodo (uuid, text, userId, done, edit) {
        this.deleteTodo(uuid);
        let todoToEdit = this.model.todos.filter((todo) => todo.uuid === uuid);
        todoToEdit.text = text;
        this.saveTodo(uuid, todoToEdit.text, userId, done, edit);
    }

    saveTodo(uuid, text, userId, done, edit) {
        if(!uuid || !text || !userId) {
            return false;
        } else {
            this.model.todos.push({uuid, text, userId, done, edit});
            this.saveModel(this.model);
            return true;
        }
    }

}

module.exports = new DBHelper();
