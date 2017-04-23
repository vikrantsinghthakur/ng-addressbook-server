var ContactService = require ("./lib/service/contact-service");
var service = new ContactService();

var c = {};
c.id = 2;
c.name = "Vikrant";
c.email = "vikrant@asdpopo.com";
c.phone = "9999226512";
c.city = "Bangalore";

service.addNew(c, (err,status)=> {
    if(err)
    console.error(err);
    else
    console.log(status);
});