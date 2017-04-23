var ContactService = require("./lib/service/contact-service-promise");

var service = new ContactService();

var c1 = {name: "Vinod", email: "vinod@vinod.co", phone: "9595959595"};

service.addNew(c1)
    .then(feedback=>{
        console.log(feedback);
    })
    .catch(err=>{
        console.error("There was an error");
        console.error(err);
    });

console.log("End of script execution ex05");