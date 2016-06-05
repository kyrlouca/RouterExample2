/**
 * Created by KyrLouca on 25/4/2016.
 */
var express =require('express');
var Router =require('Router');
var handler=require('./handler');
var mysql = require('mysql');

var conSakila= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'lemon123',
    database: 'sakila'
})

var port= process.env.PORT||3000;

var dar1=function(req,res,next){
    console.log('dar1')
    //res.send('hello dar ');
    next();
}

var dar2=function(req,res,next){
    console.log('dar2');
    res.send('hello dar2 ')
    next();
}

var dar3=function(req,res){
    console.log('dar3');
}


//************************************************************

var app=express();

app.listen(port,function(){
    console.log('listening to'+port);
})

var routerLog=express.Router();
app.use('/logged',routerLog);

var routerGen=express.Router();
app.use('/gen',routerGen);

var routerDb=express.Router();
app.use('/db',routerDb);


app.get('/',function(req,res){
    res.send('from app');
})

routerLog.get('/user1',function(req,res,next){
    res.send('hello form user1');
});

routerLog.get('/user2',function(req,res,next){
    res.send('hello form user2');
});

routerLog.use('/',function(req,res,next){
    res.send('from anything else');
    next();
});


routerGen.get('/user1',function(req,res,next){
    res.send('from gen user1')
})

routerGen.use('/',function(req,res,next){
    res.send('from gen')
})
//*****************************************************

routerDb.get('/connect',function(req,res,next){
        handler.dbConnect(conSakila);
    //res.send('connected routerDB')
})

routerDb.get('/select',function(req,res,next) {
    if(!conSakila){
        res.send('db not connected');
    }
    handler.selectActor(conSakila);

})
//*****************************************************

/**
routerDb.use('/aa',function(req,res,next){
    var mysql = require('mysql')

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'lemon123',
        database: 'sakila'
    })

    connection.connect(function(err) {
        if (err) throw err;
        console.log('You are now connected...');
        connection.query('select actor_id,first_name from actor ',function(err,results){
            console.log('selecting');
            if (err)throw err;
            for (var i= 0;i<4;i++){
                console.log(results[i].actor_id+'--'+results[i].first_name);
            }
        })
    })
    res.send('from db')
})
**/
 routerDb.use('/',function(req,res,next){
    res.send('nothing from db')
})
