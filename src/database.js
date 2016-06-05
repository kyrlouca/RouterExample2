/**
 * Created by KyrLouca on 26/4/2016.
 */
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'lemon123',
    database: 'sakila'
});
connection.connect(function (err) {
    if(err) {
        console.error('error connecting: ' + err.stack);
        return;
    }else{
        console.log('connected to db');
    }
})

exports.db=connection;
