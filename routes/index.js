const routeResponseMap = {
    "/": "views/index.html",
        "/about": "views/about.html",
        "/contact": "views/contact.html",
        "/error": "views/error.html"
};
	"/about": "<h1> About Simple Application</h1>",
	"/contact": "<h1> Contact Us </h1>",
	"/error": "<h1> Sorry - cannot find what you are looking for. </h1>"
};

var http = require('http');
var fs = require('fs');
var port = 3015;
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    if (routeResponseMap[req.url]){
        fs.readFile(routeResponseMap[req.url], (error, data) => {
                res.write(data);
                res.end();
                });

			res.end(routeResponseMap[req.url]);
		} else {
			res.end('Welcome To First Nodejs Application \n' );
		}

    res.end('Welcome To First Nodejs Application \n' );
    console.log('Processed request for '+ req.url);
}).listen(port);
console.log('Web application server running ...');
