(function() {
    'use strict';

    angular
        .module('CoreModule')
        .factory("todoService", todoService);
    
        function todoService ($http) {
            
            function saveTodo (todo) {
                return $http.post("http://localhost:3000/todo/save", {"text": todo, "done": false, "edit": false});
            }

            function getTodos () {
                return $http.get(`http://localhost:3000/todo`);
            }

            function getTodo (uuid) {
                return $http.get(`http://localhost:3000/todo/edit/${uuid}`);       
            }

            function deleteTodo (uuid) {
                return $http.post(`http://localhost:3000/todo/delete/${uuid}`);
            }

            function updateTodo (uuid, text, done, edit) {
                return $http.post(`http://localhost:3000/todo/edit/${uuid}`, {"uuid": uuid, "text": text, "done": done, "edit": edit});
            }

            return {
                getTodos: getTodos,
                saveTodo: saveTodo,
                getTodo: getTodo,
                deleteTodo: deleteTodo,
                updateTodo : updateTodo
            }

        }
        

})();
