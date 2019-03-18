const http = require('http');
// Using Node File System module
const fs = require('fs');
const path = require('path');
const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
	console.log(`Request for ${req.url} by method ${req.method}`);
	if (req.method == 'GET') {
		let fileUrl = '/index.html';
		if(req.url != '/') {
			fileUrl = req.url;
		}
		// Use Node File System Path Module
		let filePath = path.resolve(`./public${fileUrl}`);
		const fileExt = path.extname(filePath);
		if(fileExt == '.html') {
			// Check if file exists using callback function
			fs.exists(filePath, (exists) => {
				if(!exists) {
					res.statusCode = 404;
					res.setHeader('Content-type', 'header');
					res.end(`<html><body><h1>Error: ${fs.filePath} not
					found</h1></body></html>`);
					return;
				}
				res.statusCode = 200;
				res.setHeader('Content-type', 'text/html');
				// read the file and include it in the response
				fs.createReadStream(filePath).pipe(res);
			});
		}
		else {
			res.statusCode = 404;
			res.setHeader('Content-type', 'header');
			res.end(`<html><body><h1>Error: ${fs.filePath} not
			an HTML file</h1></body></html>`);
			return;
		}
	}
	else {
		res.statusCode = 404;
		res.setHeader('Content-type', 'header');
		res.end(`<html><body><h1>Error: ${req.method} not
		support</h1></body></html>`);
		return;
	}
	/*console.log(req.headers);
	res.statusCode = 200;
	res.setHeader('Content-type', 'text/html');
	res.end('<html><body><h1>Hey</h1></body></html>');*/
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}`);
});