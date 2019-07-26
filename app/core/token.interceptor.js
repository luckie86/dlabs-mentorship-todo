(function () {
    'use strict';

    angular
        .module('CoreModule')
        .factory("tokenInterceptor", function () {
            return {
                request: function (config) {
                    let token = window.localStorage.getItem("token");
                    if (token) {
                        config.headers.token = token;
                    }
                    return config;
                }
            }
        });

})();    
