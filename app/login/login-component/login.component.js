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

    function loginController ($location, loginService, tokenService) {
        
        var $ctrl = this;

        $ctrl.$onInit = onInit;

        $ctrl.login = login;

        $ctrl.register = register;
        
        //////////////////////////////
        
        function onInit () {
            let token = tokenService.getToken();
                if (token) {
                    $location.path('/todo');
                } else {
                    $location.path('/login');
                }
        }

        function login () {
            loginService.login($ctrl.userName, $ctrl.password)
                .then(function(response) {
                    if (response.status == 200) {
                        tokenService.setToken(response.data);
                        $location.path('/todo');
                    } else {
                        $location.path('/login');
                    }
            });
        }

        function register () {
            loginService.register($ctrl.userName, $ctrl.password)
                .then(function(response) {
                    if (response.status == 200) {
                        tokenService.setToken(response.data);
                        $location.path('/login');
                    } else {
                        $location.path('/todo');
                    }
            });
        }

    }

})();
