const ownerServ = require("../services/OwnerService");
const utils = require("../utils/utils");

module.exports = {
    add: async function (req, res) {
        let result = await ownerServ.add(req.body);
        utils.sendResponse(result, req, res);
    }
};