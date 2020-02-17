const routeResponseMap = {
	        "/": "views/index.html",
        "/about": "views/about.html",
        "/contact": "views/contact.html",
        "/error": "views/error.html"
};

var http = require('http');
var fs = require('fs');
var port = 3015;
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    
   if (routeResponseMap[req.url]){
                fs.readFile(routeResponseMap[req.url], (error, data) => {
                res.write(data);
                res.end();
		}); 
   }else {
			res.end("<h1>Sorry, not found.</h1>");
		}

    
    console.log('Processed request for '+ req.url);
}).listen(port);
console.log('Web application server running ...');

