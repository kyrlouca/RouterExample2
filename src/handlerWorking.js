var mysql = require('mysql');

var database = require('./database.js');
var db = database.db;


var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // intercept OPTIONS method
    if('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};
selActor = function (req, res) {
    var sql = 'select actor_id,first_name,last_name from actor where last_name > ? order by first_name limit 6';
    db.query(sql, ['a'], function (err, results) {
        if(err) {
            console.log('error:' + err)
            throw err;
        }
        console.log('***********************');
        console.log(req.headers['origin']);
        for(var i = 0; i < results.length - 1; i++) {
            console.log(results[i].actor_id + '-' + results[i].first_name + '-' + '-' + results[i].last_name)
        }


        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Origin", "*");

        console.log('finished handler seleect');
        var txt = JSON.stringify(results);

        res.send(results);
        //res.send('tests' + req.headers['origin']);

    })
}

delActor = function (req, res) {

    var fName;
    var sql;

    if(req.headers['content-type'] === 'application/json') {
        var obj = req.body;
        obj.color = 'blue';
        console.log('name:' + obj.name);
    } else {
        console.log('body:' + req.body);
    }


    sql = 'delete from actor where first_name= ? ';
    console.log('delete item:' + JSON.stringify(obj));
    db.query(sql, [obj.name], function (err, results) {
        var ret = {
            item: obj,
            results: results,
            status: 'OK'
        };



        if(results && results.affectedRows === 0) {
            ret.status = 'ERROR';
            ret.errorMsg = obj.name + ' was not found';
        }
        if(err) {
            console.log('error' + err.message);
            ret.status = 'ERROR';
            ret.errorMsg = 'Cannot Delete ' + obj.name;
            //throw err;
        }
        console.log('finished handler seleect');


        res.send(ret);
        //res.send('tests' + req.headers['origin']);

    })



}
insertActor = function (req, res) {

    var fName,
        sql,
        actor;

    if(req.headers['content-type'] == !'application/json') {
        var err = new Error('content-type must be application/json')
        throw(err);
    }

    if(!Object.keys(req.body).length) {
        var err = new Error('Body not received')
        throw(err);
    }
    //actor = JSON.parse(JSON.stringify(req.body));
    actor=req.body;
    console.log(JSON.stringify(actor))


    sql = 'insert into actor(first_name,last_name) values(?,?) ';
    console.log('insert item:' + JSON.stringify(actor));
    db.query(sql, [actor.firstName, actor.lastName], function (err, results) {
        var ret = {
            item: actor,
            key:results.insertId,
            results: results,
            status: 'OK'
        };
        if(results && results.affectedRows === 0) {
            ret.status = 'ERROR';
            ret.errorMsg = obj.name + ' was not found';
        }
        if(err) {
            console.log('error' + err.message);
            ret.status = 'ERROR';
            ret.errorMsg = 'Cannot Delete ' + obj.name;
        }
        console.log('finished handler seleect');

        res.send(ret);
        //res.send('tests' + req.headers['origin']);

    })

}

testH = function (req, res) {

    console.log('body:' + req.body);
    var oc;
    //var obj = JSON.parse(req.body) ||{'kyr Err':'No Body found'};
    if(req.method === 'POST') {


        if(req.headers['content-type'] == !'application/json') {
            var err = new Error('content-type must be application/json')
            throw(err);
        }

        if(!Object.keys(req.body).length) {
            var err = new Error('Body not received')
            throw(err);
        }
        oc = JSON.parse(JSON.stringify(req.body)); //deep copy the object
        //oc={'baby':'blue'}
        oc['markos'] = 'blue';
        console.log(JSON.stringify(oc))

    }
    else {
        oc = 'Its a get. My regards';
    }
//console.log('name:' + obj.name);
    res.status = 200;
    res.send(oc);
}


exports.selActor = selActor;
exports.delActor = delActor;
exports.testH = testH;
exports.insertActor = insertActor;
exports.allowCrossDomain = allowCrossDomain;

