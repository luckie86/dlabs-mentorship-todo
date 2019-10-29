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

        var edituuid = {
            name: "todo.edit.uuid",
            url: "/{uuid}",
            component: "editSidePanelComponent",
            resolve: {
                uuid: function ($transition$) {
                    return $transition$.params().uuid;
                }
            }
        }
               
        $stateProvider.state(edit);
        $stateProvider.state(edituuid);
        $urlRouterProvider.otherwise('/login');
    }

})();
