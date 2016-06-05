/**
 * Created by KyrLouca on 12/5/2016.
 */
http = require("http");
var url = require("url");
var sayHi = function (path, req, res) {
    var data = "";
    req.on('data', function (dat) {
        data = data + dat;
    })
    req.on('end', function () {
        res.setHeader('Content-Type', 'text/plain');
        res.writeHeader(200)
        res.end('sayhi fiinshed:' + data);
    })

    req.on('error', function (e) {
        console.log('problem with request'+e.message);
    })

    console.log('sayHi');
}

function start(route) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        route(pathname, request, response);
    }

    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
}

start(sayHi);