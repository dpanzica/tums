var http = require('http');
var port = 3015;
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Welcome To First Nodejs Application \n' );
    console.log('Processed request for '+ req.url);
}).listen(port);
console.log('Web application server running ...');

