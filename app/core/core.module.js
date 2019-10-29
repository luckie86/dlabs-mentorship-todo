(function() {
    'use strict';

    angular
        .module('CoreModule', [])
        .config(function($httpProvider) {
            $httpProvider.interceptors.push("tokenInterceptor");
        });
})();
