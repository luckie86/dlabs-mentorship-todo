(function() {
    'use strict';

    var loginComponent = {
        bindings: {
        },
        templateUrl: 'login/login-component/login.template.html',
        controller: loginController
    };

    angular
        .module('LoginModule')
        .component('loginComponent', loginComponent);

    function loginController(userService, $location, $http) {
        
        var $ctrl = this;

        $ctrl.login = login;

        $ctrl.register = register;
        
        //////////////////////////////
        
        function login () {
            $http.post("http://localhost:3000/auth/login", { 
                userName: $ctrl.userName, 
                password: $ctrl.password 
            })
                .then(function(response) {
                    if (response.status == 200) {
                        $location.path('/todo');
                    } else {
                        $location.path('/login');
                    }
            });
        }

        function register () {
            $http.post("http://localhost:3000/auth/register", {
                id: randomId(),
                userName: $ctrl.userName,
                password: $ctrl.password
            })
                .then(function(response) {
                    if (response.config.data) {
                        $location.path('/todo');
                    } else {
                        $location.path('/login');
                    }
            });
        }

        function randomId () {
            var Id = Math.floor(Math.random()*1000);
            return Id;
        }
    }

})();
