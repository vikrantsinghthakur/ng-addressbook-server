var ContactService = require("../service/contact-service-mongodb");
var service = new ContactService();

module.exports = (req,resp) => {
    service.delete(req.params.id)
            .then(data => {
                resp.json({
                    success:true,
                    data
                })
            })
            .catch(err => {
                require("./err-handler")(resp,err);
            })
};