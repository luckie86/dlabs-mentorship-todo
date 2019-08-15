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

    function todoContainerController(todoService, tokenService, $scope, $http, $location) {
        
        var $ctrl = this;

        $ctrl.task = $ctrl.task;
        
        $ctrl.tasks = [];

        $ctrl.$onInit = onInit;

        $ctrl.addTask = addTask;

        $ctrl.editTask = editTask;

        $ctrl.doneTask = doneTask;

        $ctrl.unDoneTask = unDoneTask;

        $ctrl.deleteTodo = deleteTodo;
        
        //////////////////////////////

        function onInit () {
            let token = window.localStorage.getItem('token');
            if (token) {
                todoService.getTodos()
                .then((response) => {
                    $ctrl.tasks = response;
                    $scope.$apply();
                });
            } else {
                $location.path('/authentication-wall')
            }
            
        }

        function addTask () {
            todoService.saveTodo($ctrl.task)
                .then((response) => {
                    if (response.status === 200) {
                        $scope.$apply();
                    }
                });
        }

        function editTask (uuid) {
            // HACK ???
            var filteredTask = $ctrl.tasks.filter((task) => task.uuid === uuid);
            var task = filteredTask[0].text;
            todoService.updateTodo(uuid, task, false, true)
                .then((response) => {
                    if (response.status === 200) {
                        $scope.$apply();
                    }
                });
        }

        function doneTask (uuid) {
            todoService.updateTodo(uuid, $ctrl.task, true, false)
            .then((response) => {
                if (response.status === 200) {
                    $scope.$apply();
                }
            });
        }

        function unDoneTask (uuid) {
            todoService.updateTodo(uuid, $ctrl.task, false, false)
                .then((response) => {
                    if (response.status === 200) {
                        $scope.$apply();
                    }
                });
        }

        function deleteTodo (uuid) {
            todoService.deleteTodo(uuid)
                .then((response) => {
                    if (response.status === 200) {
                        $scope.$apply();
                    }
                });
        }
           
    }

})();
