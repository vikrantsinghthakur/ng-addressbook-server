var ContactService = require('../lib/service/contact-service');
var expect = require('chai').expect;
var path = require('path');
var fs = require('fs');

var filename = path.join(__dirname, '..', 'lib', 'service', 'contacts.json');

describe('ContactService tests', ()=>{
    beforeEach(()=>{
        fs.unlinkSync(filename);
        service = new ContactService();

        var contacts = [];
        contacts.push({id:1, name: 'Vikrant', email:'vikrant@wewe.com', phone: '9191232312'})
        contacts.push({id:2, name: 'Anil', email:'anil@wewe.com', phone: '9193333323'});
        fs.writeFileSync(filename,JSON.stringify(contacts));
    });

    it("should fetch contact by id", (done)=> {
        service.get(1, (err,contact) => {
            expect(contact).to.be.a("object")
                .to.have.property("name")
                .to.equal('Vikrant')
            done();
        })
    })

    it("should add new contact", (done) => {
        let c = {};
        c.name="Andy";
        c.email='and@kal.com';
        c.phone = '123123123';
        c.city='Antigua';
        service.addNew(c, (err,status) => {
            expect(err).to.be.a('null');
            expect(status).to.be.a('object')
                        .to.have.property('message')
                        .to.be.a('string');
            done();
        });
    })
});