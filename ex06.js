var ContactService = require("./lib/service/contact-service-promise");

var service = new ContactService();


service.getAll()
    .then(contacts=>{
        console.log(contacts);
    })
    .catch(err=>{
        console.error("There was an error");
        console.error(err);
    });

let id = 12;
service.get(id)
    .then(contact => {
        if(c){
            console.log(contact);
        } else {
            console.log("Contact not found with id", id);
        }
    })
    .catch(err => {
        console.log('Contact not found with id', id);
    })

console.log("End of script execution ex05");