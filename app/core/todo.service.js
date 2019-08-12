(function() {
    'use strict';

    angular
        .module('CoreModule')
        .factory("todoService", todoService);
    
        function todoService ($http) {
            
            function saveTodo (todo) {
                return new Promise (function (resolve, reject) {
                    $http.post("http://localhost:3000/todo/save", {"text": todo, "done": false, "edit": false})
                        .then(function(response) {
                        if (response) {
                            resolve(response.data);
                        } else {
                            reject(response);
                        }
                    });
                });
            }

            function getTodos () {
                return new Promise (function (resolve, reject) {
                    $http.get("http://localhost:3000/todo")
                        .then(function(response) {
                        if (response) {
                            resolve(response.data);
                        } else {
                            reject(response);
                        }
                    });
                });
               
            }

            function getTodo (uuid) {
                return new Promise (function (resolve, reject) {
                    $http.get("http://localhost:3000/todo")
                        .then(function(response){
                        if (response) {
                            resolve(response.data.uuid === uuid);
                        } else {
                            reject(response);
                        }
                    });
                });
            }

            function deleteTodo (uuid) {
                return new Promise (function (resolve, reject) {
                    $http.post(`http://localhost:3000/todo/delete/${uuid}`)
                        .then(function(response) {
                        if (response) {
                            resolve(response.data);
                        } else {
                            reject(response);
                        }
                    });
                });
            }

            function updateTodo (uuid, text, done, edit) {
                return new Promise (function (resolve, reject) {
                    $http.post(`http://localhost:3000/todo/edit/${uuid}`, {"uuid": uuid, "text": text, "done": done, "edit": edit})
                        .then(function(response) {
                        if (response) {
                            resolve(response.data);
                        } else {
                            reject(response);
                        }
                    });
                });
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
