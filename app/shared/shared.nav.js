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

        var editid = {
            name: "todo.edit.id",
            url: "/{todoId}",
            component: "editSidePanelComponent",
            resolve: {
                todoId: function ($transition$) {
                    return $transition$.params().todoId;
                }
            }
        }
               
        $stateProvider.state(edit);
        $stateProvider.state(editid);
        $urlRouterProvider.otherwise('/');
    }

})();
