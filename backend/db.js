const mysql = require("mysql");


const connect = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "users_crud"

})

connect.connect(err => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('Connected');
});



module.exports = connect;