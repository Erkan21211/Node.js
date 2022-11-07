// CTRL + C to exist out the server

const fs = require('fs');
const url = require('url');
const http = require('http');
const port = '8000';
const localhost = '127.0.0.1';

const replace = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.foodName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRIJS%}/g, product.prijs);
    output = output.replace(/{%FROM%}/g, product.From);
    output = output.replace(/{%NUTRIENTS%}/g, product.protein);
    output = output.replace(/{%HOEVEEL%}/g, product.hoeveel); 
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    
    if(product.From != "Turkiye") output = output.replace(/{%NOT_KEBAB%}/g, 'not-kebab');
    return output;
}

const overview_page = fs.readFileSync(`${__dirname}/page/overview.html`, 'utf-8');
const card_placeholder = fs.readFileSync(`${__dirname}/page/card.html`, 'utf-8');
const product_page = fs.readFileSync(`${__dirname}/page/product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);

// SERVER
const server = http.createServer((req, res) => {
    // url routing 
    const PathName = req.url;

    // overview pagina
    if(PathName === '/' || PathName === '/overview') {
        res.writeHead(200, { 'Content-type': 'text/html'});
        	
        // loop
        const cards_html = dataObject.map(el => replace(card_placeholder, el)).join('');
        const output = overview_page.replace('{%PRODUCT_CARDS%}', cards_html);

        res.end(output);
    //  api pagina
    } else if (PathName === '/api') {
        res.writeHead(200, { 'Content-type': 'application/json'});
        res.end(data);
    // product pagina
    } else if(PathName === '/product') {
        res.end('<h1>Products<h1>');
    // error pagina
    } else {
        res.writeHead(404, { 'Content-type': 'text/html' });
        res.end('<h1>Page not found<h1>');
    }

});

server.listen(port, localhost, () => {
    console.log("Server is running on port " + port)
});