(function() {
    'use strict';

    var editSidePanelComponent = {
        bindings: {
            index: "<"
        },
        templateUrl: 'shared/edit-sidepanel-component/edit-sidepanel.template.html',
        controller: editSidePanelController
    };

    angular
        .module('SharedModule')
        .component('editSidePanelComponent', editSidePanelComponent);

    function editSidePanelController(todoService) {
        
        var $ctrl = this;

        $ctrl.$onChanges = onChanges;

        $ctrl.index = $ctrl.index;

        $ctrl.editTask = editTask;

        $ctrl.close = close;

        $ctrl.deleteTask = deleteTask;
        
        //////////////////////////////

        function onChanges () {
            $ctrl.tasks = todoService.getTodos();
            $ctrl.task = todoService.getTodo($ctrl.index);
        }

        function editTask () {
            todoService.updateTask($ctrl.index, $ctrl.task, true);
            todoService.closeTaskEditor($ctrl.index, false);
        }

        function close (index) {
            todoService.closeTaskEditor(index, false);
        }

        function deleteTask (index) {
            todoService.deleteTask(index);
        }

    }

})();
