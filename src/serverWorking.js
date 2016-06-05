var express = require('express');
var Router = require('Router');
var bodyParser = require("body-parser");
var handler = require('./handlerWorking');

//*****************************************************
// get applied to exact path
// use applied to path and after that
// router will therefore apply for all paths after
//*****************************************************

var app = express();
var routerDb = express.Router();

app.listen(2000, function () {
    console.log('listening to ' + this.address().port);
})
//*****************************************************
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.text());
app.use(handler.allowCrossDomain);


/**
 app.use(function(){
    console.log('hello')
})
 **/

// for db and after user routerDB!
app.get('/db', function (req, res) {
    res.send('db')
})

app.use('/test', function (req, res) {
    handler.testH(req, res);
})
app.post('/db/insert', function (req, res) {
    handler.insertActor(req, res);
})

app.get('/db/connect', function (req, res) {
    //handler.selActor(req,res)
})

app.get('/db/select', function (req, res) {
    console.log('db start select');
    handler.selActor(req, res);
    console.log('db end select')
    //no point to write a send. the code is not linear
})

app.post('/ff', function (req, res) {
    console.log('db delete');
    handler.delActor(req, res);
    //handler.testH(req,res);
})


app.use('/', function (req, res) {
    res.send('rest of folders')
})

//last appp. it will only come here if everthting else failed
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});
