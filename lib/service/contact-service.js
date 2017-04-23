var fs= require ("fs");
var requiredFields = ["name", "email", "phone"];
var path = require("path");
var fileName = path.join(__dirname,'contacts.json');

class ContactService{
    constructor(){
        if(!fs.existsSync(fileName)){
            fs.writeFileSync(fileName, '[]');
        }
    }

    addNew(contact, callback){
        
        setTimeout(() => {
            if(arguments.length != 2){
            throw new Error("Missing arguments, needed 2 but got ", arguments.length)
            }

            if(typeof callback != "function"){
                throw new Error ("Callback was not a function")
            }

            if(typeof contact != "object"){
                let err = {};
                err.code = 101;
                err.message =  "Contact was not an object"
                callback(err);
                return;
            }

            for(var i=0; i<requiredFields.length;i++){
                var f = requiredFields[i];
                if(!(f in contact)){
                    let err = {};
                    err.code = 102;
                    err.message = `The required field ${f} is missing`;
                    callback(err);
                    return;
                }
            }

            fs.readFile(fileName , "utf8", (err, data) => {
                if(err){
                    callback(err);
                    return;
                }
                data = JSON.parse(data);

                if(data.filter(c => c.email === contact.email).length>0){
                    let err = {};
                    err.code = 103;
                    err.message = `The email ${contact.email} is already present`;
                    callback(err);
                    return;
                }

                if(data.filter(c => c.phone === contact.phone).length>0){
                    let err = {};
                    err.code = 103;
                    err.message = `The phone ${contact.phone} is already present`;
                    callback(err);
                    return;
                }

                data.push(contact);
                fs.writeFile(fileName, JSON.stringify(data), (err,data) => {
                    if(err){
                        callback(err);
                        return;
                    }

                    let feedback = {}
                    feedback.message = 'Contact added succesfully';
                    feedback.id = contact.id;
                    callback(null,feedback);
                });
            });
        },0);
    }

    get(id,callback){
        setTimeout(()=> {
            if(!id || typeof(id)!= 'number'){
                throw new Error('ID was not supplied or was not a number');
            }
            if(!callback || typeof callback != 'function'){
                throw new Error('Callback was not supplied or was not a function');
            }
            fs.readFile(fileName, 'utf8', (err,data) => {
                if(err){
                    callback(err);
                    return;
                }
                
                data=JSON.parse(data);

                var result = data.filter(d => d.id == id)[0];
                callback(null, result);
            })
        },0);
    }
}

module.exports = ContactService;