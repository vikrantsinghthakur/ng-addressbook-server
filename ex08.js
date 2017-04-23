var ContactService = require("./lib/service/contact-service-mongodb");

var service = new ContactService();

var c1 = {name: "Vinod", city: "Bangalore", email: "vinod*vinod.co", phone:"9123123123"};

service.addNew(c1)
    .then(resp => {
        console.log(resp);
    })
    .catch(err => {
        console.log(err);
    });