(function() {
    'use strict';

    var editSidePanelComponent = {
        bindings: {
        },
        templateUrl: 'shared/edit-sidepanel-component/edit-sidepanel.template.html',
        controller: editSidePanelController
    };

    angular
        .module('SharedModule')
        .component('editSidePanelComponent', editSidePanelComponent);

    function editSidePanelController(todoService, $state ,$stateParams) {
        
        var $ctrl = this;

        $ctrl.tasks = [];

        $ctrl.newTask = $ctrl.newTask;

        $ctrl.$onInit = onInit;

        $ctrl.editTask = editTask;

        $ctrl.closeTaskEditor = closeTaskEditor;

        $ctrl.deleteTodo = deleteTodo;

        $ctrl.openCloseTask 
        
        //////////////////////////////

        function onInit () {
            todoService.getTodo($stateParams.uuid)
            .then((response) => {
                $ctrl.task = response.data;
            })
        }

        function editTask (task) {
            todoService.updateTodo(task.uuid, $ctrl.newTask.text)
            .then((response, error) => {
                if(response.status === 200) {
                    closeTaskEditor();
                } else {
                    console.log(error);
                }
            });
        }

        function deleteTodo (uuid) {
            todoService.deleteTodo(uuid)
                .then((response) => {
                    if (response.status === 200) {
                        closeTaskEditor();
                    }
                });
        }

        function closeTaskEditor () {
            $state.go('todo');
        }

    }

})();
