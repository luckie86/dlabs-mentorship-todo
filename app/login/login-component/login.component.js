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

    function loginController(userService, $location) {
        
        var $ctrl = this;

        $ctrl.login = login;
        
        //////////////////////////////
        
        

        function login () {
            var currentUser = userService.checkUser($ctrl.userName, $ctrl.password);
            if (currentUser) {
                $location.path('/todo');
            }
        }

    }

})();
