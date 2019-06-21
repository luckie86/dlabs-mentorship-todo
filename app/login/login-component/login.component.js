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
            $http.get("http://localhost:3000/auth/login")
                .then(function(response) {
                    console.log(response.data);
            });
        }

        function register () {
            $http.get("http://localhost:3000/auth/register")
                .then(function(response) {
                    console.log(response.data);
            });
        }

    }

})();
