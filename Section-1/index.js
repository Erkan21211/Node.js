// CTRL + C to exist out the server

const fs = require('fs');
const url = require('url');
const http = require('http');
const port = '8000';
const localhost = '127.0.0.1';

const data = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const READdata = JSON.parse(data);

// SERVER
const server = http.createServer((req, res) => {

    // url routing 
    const PathName = req.url;
    if(PathName === '/' || PathName === '/overview') {
        res.end('<h1>overview<h1>');
    } else if (PathName === '/api') {
        res.writeHead(200, { 'Content-type': 'application/json'});
        res.end(data);
    } else if(PathName === '/product') {
        res.end('<h1>Products<h1>');
    } else {
        res.writeHead(404, { 'Content-type': 'text/html' });
        res.end('<h1>Page not found<h1>');
    }

});

server.listen(port, localhost, () => {
    console.log("Server is running on port " + port)
});