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

    function todoContainerController(todoService, $scope, $http, $location) {
        
        var $ctrl = this;

        $ctrl.task = $ctrl.task;
        
        $ctrl.tasks = [];

        $ctrl.$onInit = onInit;

        $ctrl.addTask = addTask;

        $ctrl.editTask = editTask;

        $ctrl.doneTask = doneTask;

        $ctrl.unDoneTask = unDoneTask;

        $ctrl.deleteTask = deleteTask;
        
        //////////////////////////////

        function onInit () {
            todoService.getTodos()
                .then((response)=>{
                    $ctrl.tasks = response;
                    $scope.$apply();
                });
        }

        function addTask () {
            todoService.saveTodos({task: $ctrl.task, done: false, edit: false});
            
            // $http.get("http://localhost:3000/users")
            // .then(function(response){
            //     console.log(response.data);
            // });
            
            // $http.post("http://localhost:3000/todo/save", { 
            //     id: randomId(), 
            //     text: $ctrl.task,
            //     userId: 0
            // })
            // .then(function(response) {
            //     if (response.status == 200) {
            //         $location.path('/todo');
            //     } else {
            //         $location.path('/login');
            //     }
            // });
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

            $http.get("http://localhost:3000/todo/delete/"+index)
            .then(function(response) {
                if (response.status == 200) {
                    $location.path('/todo');
                } else {
                    $location.path('/login');
                }
            });
        }
        
        function randomId() {
            let randomId = Math.floor(Math.random()*1000);
            return randomId;
        }

    }

})();
