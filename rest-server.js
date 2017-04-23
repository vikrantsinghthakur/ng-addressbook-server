var express = require('express');
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log("Server started at http://localhost:3000")
});

app.use(function(req, resp, next){
    resp.header("Access-Control-Allow-Origin", "*");
    resp.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept")
    resp.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

    next();

});

var basePath = "/api/contacts";

app.get(basePath, require("./lib/controllers/get-contacts.js"));
app.get(basePath + '/:id', require("./lib/controllers/get-one-contact.js"));
app.post(basePath, require("./lib/controllers/create-contact.js"));
app.put(basePath + '/:id', require("./lib/controllers/update-contact.js"));
app.delete(basePath + '/:id', require("./lib/controllers/delete-contact.js"));

