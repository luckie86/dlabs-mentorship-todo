(function() {
    'use strict';

    angular
        .module('CoreModule')
        .factory("todoService", todoService);
    
        function todoService () {
            var arrayOfTodos = [];
            
            function saveTodos (todo) {
                arrayOfTodos.push(todo);
            }

            function getTodos () {
               return arrayOfTodos;
            }

            function getTodo (index) {
                return arrayOfTodos[index].task;
            }

            function deleteTask (index) {
                arrayOfTodos.splice(index, 1);
            }

            function updateTask (index, task, edit) {
                arrayOfTodos[index].task = task;
                arrayOfTodos[index].edit = edit;
            }

            function closeTaskEditor (index, status) {
                arrayOfTodos[index].edit = status;
            }

            return {
                getTodos: getTodos,
                saveTodos: saveTodos,
                getTodo: getTodo,
                deleteTask: deleteTask,
                updateTask : updateTask,
                closeTaskEditor: closeTaskEditor,
            }

        }
        

})();
