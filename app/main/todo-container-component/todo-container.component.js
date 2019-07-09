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

    function todoContainerController(todoService, $http, $location) {
        
        var $ctrl = this;

        $ctrl.task = $ctrl.task;
        
        $ctrl.tasks;

        $ctrl.$onInit = onInit;

        $ctrl.addTask = addTask;

        $ctrl.editTask = editTask;

        $ctrl.doneTask = doneTask;

        $ctrl.unDoneTask = unDoneTask;

        $ctrl.deleteTask = deleteTask;
        
        //////////////////////////////

        function onInit () {
            $ctrl.tasks = todoService.getTodos();
        }

        function addTask () {
            todoService.saveTodos({task: $ctrl.task, done: false, edit: false});
            
            $http.post("http://localhost:3000/todo", { 
                id: 0, 
                text: $ctrl.task,
                userId: 0
            })
            .then(function(response) {
                if (response.status == 200) {
                    $location.path('/todo');
                } else {
                    $location.path('/login');
                }
            });
        }
            
        function editTask (index) {
            $ctrl.tasks[index].edit = true;
            todoService.updateTask(index, $ctrl.task, true);

            $http.get("http://localhost:3000/todo/edit/"+index)
            .then(function(response) {
                if (response.status == 200) {
                    $location.path('/todo/edit/index');
                } else {
                    $location.path('/login');
                }
            });
        }

        function doneTask (index) {
            $ctrl.tasks[index].done = true;
        }

        function unDoneTask (index) {
            $ctrl.tasks[index].done = false;
        }

        function deleteTask (index) {
            todoService.deleteTask(index);

            $http.get("http://localhost:3000/todo/delete/"+index)
            .then(function(response) {
                if (response.status == 200) {
                    $location.path('/todo');
                } else {
                    $location.path('/login');
                }
            });

        }

    }

})();
