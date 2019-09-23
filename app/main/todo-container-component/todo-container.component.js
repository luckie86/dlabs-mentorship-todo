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
                .then((response) => {
                    $ctrl.tasks = response.data;
                }); 
            }
          });

        function onInit () {
            let token = tokenService.getToken();
            if (token) {
                todoService.getTodos()
                .then((response) => {
                    $ctrl.tasks = response.data;
                });
            } else {
                $location.path('/authentication-wall')
            }
        }
    
        function addTask () {
            todoService.saveTodo($ctrl.task)
                .then((response) => {
                    if (response.status === 200) {
                        todoService.getTodos()
                        .then((response) => {
                            $ctrl.tasks = response.data;
                        })
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

        function doUndoTask (uuid) {
            if (document.getElementById("btn-"+uuid).innerHTML.trim() == "ToDo") {
                document.getElementById("btn-"+uuid).classList.remove("btn-primary");
                document.getElementById("btn-"+uuid).classList.add("btn-success");
                document.getElementById("btn-"+uuid).innerHTML = "Done";
            } else if (document.getElementById("btn-"+uuid).innerHTML.trim() == "Done") {
                document.getElementById("btn-"+uuid).classList.remove("btn-success");
                document.getElementById("btn-"+uuid).classList.add("btn-primary");
                document.getElementById("btn-"+uuid).innerHTML = "ToDo";
            }
        }

        function deleteTodo (uuid) {
            todoService.deleteTodo(uuid)
                .then((response) => {
                    if (response.status === 200) {
                        todoService.getTodos()
                        .then((response) => {
                            $ctrl.tasks = response.data;
                        })
                    }
                });
        }
           
    }

})();
