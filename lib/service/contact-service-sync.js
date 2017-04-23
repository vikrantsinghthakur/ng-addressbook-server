var contacts = [];
var idCounter = 0;
var requiredFields = ["name", "email", "phone"];

module.exports.addNew = contact => {
    for(var i =0; i< requiredFields.length; i++){
        var f = requiredFields[i];
        if(!(f in contact)){
            throw new Error(`The required field ${f} is missing`);
        }
    }
    contact.id = ++idCounter;
    contacts.push(contact);
    return contact.id;
}

module.exports.get = id => {
    if(!id) throw new Error("ID was not supplied");
    if(typeof id != "number") throw new Error("ID must be a number");
    return contacts.filter(contact => contact.id == id)[0];
}