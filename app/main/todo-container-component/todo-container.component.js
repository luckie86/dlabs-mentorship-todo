(function() {
    'use strict';

    var todoContainerComponent = {
        bindings: {
        },
        templateUrl: 'main/todo-container-component/todo-container.template.html',
        controller: todoContainerController
    };

    angular
        .module('SharedModule')
        .component('todoContainerComponent', todoContainerComponent);

    function todoContainerController (todoService, $transitions, $location, tokenService) {
        
        var $ctrl = this;

        $ctrl.taskToEdit;
        
        $ctrl.tasks = [];

        $ctrl.edit = false;

        $ctrl.done = false;

        $ctrl.$onInit = onInit;

        $ctrl.addTask = addTask;

        $ctrl.editTask = editTask;

        $ctrl.doUndoTask = doUndoTask;

        $ctrl.deleteTodo = deleteTodo;
        
        //////////////////////////////

        $transitions.onSuccess({}, function(trans) {
            if (trans._targetState._identifier === 'todo') {
                todoService.getTodos()
                .then((response, error) => {
                    if (response.status == 200) {
                        $ctrl.tasks = response.data;
                    } else {
                        console.log(error);
                    }
                }); 
            }
          });

        function onInit () {
            let token = tokenService.getToken();
            if (token) {
                todoService.getTodos()
                .then((response, error) => {
                    if (response.status == 200) {
                        $ctrl.tasks = response.data;
                    } else {
                        console.log(error);
                    }
                });
            } else {
                $location.path('/authentication-wall')
            }
        }
    
        function addTask () {
            todoService.saveTodo($ctrl.task, false)
                .then((response, error) => {
                    if (response.status === 200) {
                        todoService.getTodos()
                        .then((response, error) => {
                            if (response) {
                                $ctrl.tasks = response.data;
                            } else {
                                console.log(error);
                            }
                            
                        })
                    } else {
                        console.log(error);
                    }
                });
        }

        function editTask (task) {
            if(!$ctrl.edit) {
                $ctrl.taskToEdit = task;
                $ctrl.edit = true;
            } else {
                $ctrl.edit = false;
            }
        }

        function doUndoTask (todo, done) {
            todoService.updateTodo(todo.uuid, todo.text, done)
            .then((response, error) => {
                if (response.status == 200) {
                    todoService.getTodos()
                    .then((response) => {
                        if (response.status == 200) {
                            $ctrl.tasks = response.data;
                        } else {
                            console.log(error);
                        }
                    })
                } else {
                    console.log(error);
                }
            })
        }

        function deleteTodo (uuid) {
            todoService.deleteTodo(uuid)
                .then((response, error) => {
                    if (response.status === 200) {
                        todoService.getTodos()
                        .then((response, error) => {
                            if (response.statuts == 200) {
                                $ctrl.tasks = response.data;
                            } else {
                                console.log(error);
                            }
                        })
                    } else {
                        console.log(error);
                    }
                });
        }
           
    }

})();
