(function() {
    'use strict';

    angular
        .module('CoreModule')
        .factory("userService", userService);
    
        function userService () {
            
            var arrayOfUsers = [{
                id: 1,
                userName: "luka",
                role: "admin",
                password: "admin123"
            }, {
                id: 2,
                userName: "miha",
                role: "user",
                password: "user123"
            }
        ];
            
        function checkUser (user, password) {
            if (user == arrayOfUsers.userName || user == arrayOfUsers.userName) {
                return true;
            } else {
                arrayOfUsers.push({user: user, role: "user", id: Math.floor(Math.random()*100), password: password});
                return true;
            }
        }

        function getCurrentUser (id) {
            arrayOfUsers.forEach(user, function(){
                if(user.id == id) {
                    return arrayOfUsers
                }
            });
        }

        return {
            checkUser: checkUser,
            getCurrentUser: getCurrentUser,
        }

        }
        

})();
