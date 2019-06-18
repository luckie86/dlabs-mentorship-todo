(function() {
    'use strict';

    angular
        .module('MainModule')
        .config(todoListRoute);

    function todoListRoute($locationProvider, $urlRouterProvider , $stateProvider) {
        
        var todo = {
            name: "todo",
            url: "/todo",
            component: "todoContainerComponent"
        }
               
        $stateProvider.state(todo);
        $urlRouterProvider.otherwise('/');
    }

})();
