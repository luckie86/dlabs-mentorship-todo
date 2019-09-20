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

    function loginController($location, $http) {
        
        var $ctrl = this;

        $ctrl.$onInit = onInit;

        $ctrl.login = login;

        $ctrl.register = register;
        
        //////////////////////////////
        
        function onInit () {
            let token = window.localStorage.getItem("token");
                if (token) {
                    $location.path('/todo');
                } else {
                    $location.path('/login');
                }
        }

        function login () {
            $http.post("http://localhost:3000/auth/login", { 
                userName: $ctrl.userName, 
                password: $ctrl.password 
            })
                .then(function(response) {
                    if (response.status == 200) {
                        window.localStorage.setItem("token",response.data);
                        $location.path('/todo');
                    } else {
                        $location.path('/login');
                    }
            });
        }

        function register () {
            $http.post("http://localhost:3000/auth/register", {
                userName: $ctrl.userName,
                password: $ctrl.password
            })
                .then(function(response) {
                    if (response.status == 200) {
                        window.localStorage.setItem("token", response.data);
                        $location.path('/authentication-wall');
                    } else {
                        $location.path('/login');
                    }
            });
        }

    }

})();
