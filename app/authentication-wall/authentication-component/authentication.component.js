(function() {
    'use strict';

    var authenticationWallComponent = {
        bindings: {
        },
        templateUrl: '/authentication-wall/authentication-component/authentication.template.html',
        controller: AuthenticationController 
    };

    angular
        .module('LoginModule')
        .component('authenticationWallComponent', authenticationWallComponent);

    function AuthenticationController ($location) {
        
        var $ctrl = this;

        $ctrl.$onInit = onInit;

        $ctrl.loginOrRegister = loginOrRegister;
        
        //////////////////////////////
        
        function onInit () {
            let token = window.localStorage.getItem("token");
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
