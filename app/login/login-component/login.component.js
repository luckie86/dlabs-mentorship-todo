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
        
        // on init

        // pogledaš v local storage in preveriš če je tam, v tem primeru ga redidrektaš na /todo
        // v nasporotnem pa na /login


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
                id: randomId(),
                userName: $ctrl.userName,
                password: $ctrl.password
            })
                .then(function(response) {
                    if (response.status == 200) {
                        window.localStorage.setItem("token", response.data);
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
