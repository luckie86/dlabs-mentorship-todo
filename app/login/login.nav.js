(function() {
    'use strict';

    angular
        .module('LoginModule')
        .config(loginRoute);

    function loginRoute($locationProvider, $urlRouterProvider , $stateProvider) {
        
        var login = {
            name: "login",
            url: "/login",
            component: "loginComponent"
        }
               
        $stateProvider.state(login);
        $urlRouterProvider.otherwise('/');
    }

})();
