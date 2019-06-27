var fs = require('fs');

class UsersService {

    constructor () {
        this.obj = {
            table: [

            ]
        };
    }
    
    saveUser (id, user, password, datetime) {
        var userObject = {id: id, user: user, password: password, datetime: datetime};
        this.obj.table.push(userObject);
        var json = JSON.stringify(this.obj);
        fs.appendFile('DB.json', json + ',', 'utf8', function(err){
            if (err) {
                console.log(err);
            } else {
                console.log("User saved.");
            }
        });
    }

    getUser(currentUserName, currentUserPassword) {
        fs.readFileSync('DB.json', 'utf8', function readFileCallback(err, data){
            if (err) {
                console.log(err);
            } else {
            var obj = JSON.parse(data);
            var userMatch; 
            obj.table.forEach(user => {
                if(user.user == currentUserName && user.password == currentUserPassword) {
                    console.log(user);
                    userMatch = user;
                    return userMatch;
                }
            });
        }});
    }

    getUsers () {
        fs.readFile('DB.json', 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err);
            } else {
                obj = JSON.parse(data);
                json = JSON.stringify(obj); 
                console.log(json);
                return json;
        }});
    }


}

module.exports = UsersService;
