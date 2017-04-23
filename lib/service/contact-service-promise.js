var path = require("path");
var fs = require ("fs");
var filename = path.join(__dirname, "contacts-v2.json");

class ContactService{
    constructor(){
        if(!fs.existsSync(filename)){
            let data = {};
            data.idCounter = 0;
            data.contacts = [];
            fs.writeFileSync(filename, JSON.stringify(data));
        }
    }
    addNew(contact){
        return new Promise((resolve,reject) => {
            if(!contact || typeof contact != "object"){
                let err={code: 1001};
                err.message = "Contact was not supplied or was not an object";
                reject(err);
                return;
            }

            let requiredFields = ["name", "email", "phone"];
            let missingFields = [];
            for(let i=0; i<requiredFields.length; i++){
                let f = requiredFields[i];
                if(!(f in contact)){
                    missingFields.push(f);
                }
            }

            if(missingFields.length>0){
                let err = {code:1002};
                err.message = "Missing fields - "+ missingFields.join();
                reject(err);
                return;
            }

            fs.readFile(filename, "utf8", (err,data) => {
                if(err){
                    reject(err);
                    return;
                }

                data = JSON.parse(data);
                let contacts = data.contacts;
                if(contacts.filter(c => c.email==contact.email).length>0){
                    let err = {code: 1003};
                    err.message = "Email already exists";
                    reject(err);
                    return;
                }
                if(contacts.filter(c => c.phone==contact.phone).length>0){
                    let err = {code: 1004};
                    err.message = "Phone already exists";
                    reject(err);
                    return;
                }
                contact.id = ++data.idCounter;
                data.contacts.push(contact);
                fs.writeFile(filename, JSON.stringify(data), (err,status) => {
                    if(err){
                        reject(err);
                    } else {
                        let feedback = { id: contact.id };
                        feedback.message = "New contact added succesfully";
                        resolve(feedback);
                    }
                })
            });
        });
    }

    get(id){
        return new Promise((resolve,reject) => {
            if(!id || typeof id != 'number'){
                let err = {code: 1005};
                err.message = "Id was not supplied or was not a number";
                reject(err);
                return;
            }

             fs.readFile(filename, "utf8", (err,data) => {
                if(err){
                    reject(err);
                    return;
                }

                data = JSON.parse(data);
                let contacts = data.contacts;
                resolve(contacts.filter(c=>c.id==id)[0]);
            });  
        })
    }

    getAll(){
        return new Promise((resolve,reject) => {
             fs.readFile(filename, "utf8", (err,data) => {
                if(err){
                    reject(err);
                    return;
                }

                data = JSON.parse(data);
                let contacts = data.contacts;
                resolve(contacts);
            });  
        })
    }
}

module.exports = ContactService;