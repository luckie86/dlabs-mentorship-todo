(function() {
    'use strict';

    angular
        .module('CoreModule')
        .factory("todoService", todoService);
    
        function todoService ($http) {
            
            function saveTodo (text, done) {
                return $http.post("http://localhost:3000/todo/save", {"text": text, "done": done});
            }

            function getTodos () {
                return $http.get(`http://localhost:3000/todo`);
            }

            function getTodo (uuid) {
                return $http.get(`http://localhost:3000/todo/edit/${uuid}`);       
            }

            function deleteTodo (uuid) {
                return $http.delete(`http://localhost:3000/todo/delete/${uuid}`);
            }

            function updateTodo (uuid, text, done) {
                return $http.put(`http://localhost:3000/todo/edit/${uuid}`, {"uuid": uuid, "text": text, "done": done});
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
