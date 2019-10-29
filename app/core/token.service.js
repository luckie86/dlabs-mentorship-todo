(function() {
    'use strict';

    angular
        .module('CoreModule')
        .factory("tokenService", tokenService);
    
        function tokenService () {

            function getToken () {
                return window.localStorage.getItem("token");
            }
            
            function setToken(token) {
                return window.localStorage.setItem("token", token);
            } 
           
            return {
                getToken: getToken,
                setToken: setToken
            }

        }
        

})();
