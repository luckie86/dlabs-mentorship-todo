(function() {
    'use strict';

    angular
        .module('CoreModule')
        .factory("loginService", loginService);
    
        function loginService ($http) {
            
            function login (userName, password) {
                return $http.post("http://localhost:3000/auth/login", { 
                    userName: userName, 
                    password: password 
                })
            }

            function register (userName, password) {
                return $http.post("http://localhost:3000/auth/register", {
                    userName: userName,
                    password: password
                })
            }

            return {
                login: login,
                register: register
            }

        }
        
})();
