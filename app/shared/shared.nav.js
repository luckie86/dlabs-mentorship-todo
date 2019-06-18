(function() {
    'use strict';

    angular
        .module('SharedModule')
        .config(editSidepanelRoute);

    function editSidepanelRoute($locationProvider, $urlRouterProvider , $stateProvider) {
        
        var edit = {
            name: "todo.edit",
            url: "/edit",
            component: "editSidePanelComponent"
        }
               
        $stateProvider.state(edit);
        $urlRouterProvider.otherwise('/');
    }

})();
