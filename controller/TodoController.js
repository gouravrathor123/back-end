const todoServ = require("../services/TodoService");
const utils = require("../utils/utils");

module.exports = {
    add: async function (req, res) {
        let result = await todoServ.add(req.body);
        utils.sendResponse(result, req, res);
    },
};