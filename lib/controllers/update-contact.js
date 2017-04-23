var ContactService = require("../service/contact-service-mongodb");
var service = new ContactService();

module.exports = (req,resp) => {
    req.body._id = req.params.id;
    service.update(req.body)
            .then(feedback => {
                resp.json({ 
                            success: true, 
                            id: feedback._id
                        });
            }).catch(err => {
                require('./err-handler')(resp,err);
            })
}