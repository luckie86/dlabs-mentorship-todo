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

    function todoContainerController(todoService, $scope) {
        
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
        }
            
        function editTask (index) {
            $ctrl.tasks[index].edit = true;
            todoService.updateTask(index, $ctrl.task, true);
        }

        function doneTask (index) {
            $ctrl.tasks[index].done = true;
        }

        function unDoneTask (index) {
            $ctrl.tasks[index].done = false;
        }

        function deleteTask (index) {
            todoService.deleteTask(index);
        }

    }

})();
