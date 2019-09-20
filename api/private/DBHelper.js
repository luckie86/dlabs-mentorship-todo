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

    getTodo (uuid) {
        if (!this.model) {
            this.getModel();
            return this.model.todos.find(todo=>todo.uuid === uuid);
        } else {
            return this.model.todos.find(todo=>todo.uuid === uuid);
        }   
    }

    deleteTodo (uuid) {
        let currentModel = this.model;
        let newTodos = currentModel.todos.filter((todo) => todo.uuid !== uuid);       
        currentModel.todos = newTodos;
        this.saveModel(currentModel);    
    }

    editTodo (uuid, text) {
        this.model.todos.map((todo)=>{
            if(todo.uuid === uuid) {
                todo.text = text;
                return todo;
            } else {
                return todo;
            }
        })
        this.saveModel(this.model);
    }

    saveTodo(uuid, text, userId) {
        if(!uuid || !text || !userId) {
            return false;
        } else {
            this.model.todos.push({uuid, text, userId});
            this.saveModel(this.model);
            return true;
        }
    }

}

module.exports = new DBHelper();
