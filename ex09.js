var http = require('http');

var cfg = {
    hostname: "mybasket.vinod.co",
    path: "/api/products/1"
};

http.get(cfg, resp => {
    resp.on("data",data =>{
        console.log(data.toString());
    })
});