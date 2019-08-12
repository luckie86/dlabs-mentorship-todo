(function() {
    'use strict';

    var editSidePanelComponent = {
        bindings: {
            uuid: "<"
        },
        templateUrl: 'shared/edit-sidepanel-component/edit-sidepanel.template.html',
        controller: editSidePanelController
    };

    angular
        .module('SharedModule')
        .component('editSidePanelComponent', editSidePanelComponent);

    function editSidePanelController(todoService, $http, $location, $scope) {
        
        var $ctrl = this;

        $ctrl.tasks = [];

        $ctrl.$onInit = onInit;

        $ctrl.uuid = $ctrl.uuid;

        $ctrl.editTask = editTask;

        $ctrl.closeTaskEditor = closeTaskEditor;

        $ctrl.deleteTodo = deleteTodo;
        
        //////////////////////////////

        function onInit () {
            todoService.getTodos()
                .then((response)=>{
                    $ctrl.tasks = response;
                    $scope.$apply();
                });
        }

        function editTask (uuid) {
            todoService.updateTodo(uuid, $ctrl.task, false, true)
                .then((response) => {
                    if (response.status === 200) {
                        $scope.$apply();
                    }
                });
        }

        function closeTaskEditor (uuid) {
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
