var http = require('http');
var server = http.createServer((req,resp) => {
    console.log("processing the request for a client....");
    resp.end("Hello World!!");
});

server.listen(3000, ()=> {
    console.log("Server started at http://localhost:3000/ ");
});

console.log("Starting the server...");