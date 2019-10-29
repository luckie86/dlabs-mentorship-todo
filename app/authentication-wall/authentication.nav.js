(function() {
    'use strict';

    angular
        .module('AuthenticationModule')
        .config(authenticationRoute);

    function authenticationRoute ($urlRouterProvider , $stateProvider) {
        
        var authenticationWall = {
            name: "authenticationWall",
            url: "/authentication-wall",
            component: "authenticationWallComponent"
        }
               
        $stateProvider.state(authenticationWall);
        $urlRouterProvider.otherwise('/');
    }

})();
