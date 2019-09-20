(function() {
    'use strict';

    angular
        .module('CoreModule')
        .factory("tokenService", tokenService);
    
        function tokenService () {

            function getToken () {
                currentUserToken = window.localStorage.getItem("token");
                return currentUserToken;
            }
            
            function setToken(token) {
                window.localStorage.setItem("token", token);
            } 
           
            return {
                getToken: getToken,
                setToken: setToken
            }

        }
        

})();
