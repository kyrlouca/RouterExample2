/**
 * Created by KyrLouca on 26/4/2016.
 */
var mysql = require('mysql');

var dbConnect = function (connection) {

   connection.connect(function (err) {
        if(err) {
            console.log('cannot connect');
            // throw err;
        }
        console.log('You are now connected in Sakila...');
    })
}
var selectActor = function (connection) {
    if(!connection) {
        console.log('no conn');
        return;
    }
    connection.query('select actor_id,first_name from actor ', function (err, results) {
        if(err)throw err;
        console.log('in handler selecting');
        for(var i = 0; i < 4; i++) {
            console.log(results[i].actor_id + '--' + results[i].first_name);
        }

    })
}

exports.dbConnect = dbConnect;
exports.selectActor = selectActor;