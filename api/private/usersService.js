// var fs = require('fs');

// class UsersService {

//     constructor () {
//         this.obj = {
//             users: [],
//             todos: []
//         };
//     }
    
//     saveUser (id, user, password, datetime) {
//         var userObject = {id: id, user: user, password: password, datetime: datetime};
//         this.obj.users.push(userObject);
//         var json = JSON.stringify(this.obj);
//         fs.appendFile('DB.json', json + ',', 'utf8', function(err){
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log("User saved.");
//             }
//         });
//     }

//     getUser(currentUserName, currentUserPassword, callback) {
//         fs.readFile('DB.json', 'utf8', function readFileCallback(err, data){
//             if (err) {
//                 console.log(err);
//             } else {
//             var obj = JSON.parse(data);
//             obj.users.forEach(user => {
//                 if(user.user == currentUserName && user.password == currentUserPassword) {
//                     callback(user);
//                     return user;
//                 }
//             });
//         }});
//     }

//     getUsers () {
//         fs.readFile('DB.json', 'utf8', function readFileCallback(err, data){
//             if (err){
//                 console.log(err);
//             } else {
//                 obj = JSON.parse(data);
//                 json = JSON.stringify(obj); 
//                 console.log(json);
//                 return json;
//         }});
//     }


// }

// module.exports = UsersService;
