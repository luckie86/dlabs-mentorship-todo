(function() {
    'use strict';

    var authenticationWallComponent = {
        bindings: {
        },
        templateUrl: '/authentication-wall/authentication-component/authentication.template.html',
        controller: authenticationController 
    };

    angular
        .module('LoginModule')
        .component('authenticationWallComponent', authenticationWallComponent);

    function authenticationController ($location, tokenService) {
        
        var $ctrl = this;

        $ctrl.$onInit = onInit;

        $ctrl.loginOrRegister = loginOrRegister;
        
        //////////////////////////////
        
        function onInit () {
            let token = tokenService.getToken();
            if (token) {
                $location.path('/todo');
            } else {
                $location.path('/authentication-wall');
            } 
        }

        function loginOrRegister () {
            $location.path('/login');
        }

    }

})();
