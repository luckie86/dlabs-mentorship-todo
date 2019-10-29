(function () {
    'use strict';

    angular
        .module('CoreModule')
        .factory("tokenInterceptor", function (tokenService) {
            return {
                request: function (config) {
                    let token = tokenService.getToken();
                    if (token) {
                        config.headers.token = token;
                    }
                    return config;
                }
            }
        });

})();    
