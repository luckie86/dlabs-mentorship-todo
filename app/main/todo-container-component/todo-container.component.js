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

    function todoContainerController(todoService, $transitions, $location) {
        
        var $ctrl = this;

        $ctrl.taskToEdit;
        
        $ctrl.tasks = [];

        $ctrl.token;

        $ctrl.edit = false;

        $ctrl.done = false;

        $ctrl.$onInit = onInit;

        $ctrl.addTask = addTask;

        $ctrl.editTask = editTask;

        $ctrl.doneTask = doneTask;

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
            $ctrl.token = window.localStorage.getItem('token');
            if ($ctrl.token) {
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

        function doneTask (task) {
            if(!$ctrl.done) {
                $ctrl.done = true;
            } else {
                $ctrl.done = false;
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
