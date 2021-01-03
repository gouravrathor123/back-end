const todoServ = require("../services/TodoService");
const utils = require("../utils/utils");

module.exports = {
    add: async function (req, res) {
        let result = await todoServ.add(req.body);
        utils.sendResponse(result, req, res);
    },

    edit: async function (req,res) {
        let {
            id
        } = req.params;
        let result = await todoServ.update(req.body, id);
        utils.sendResponse(result, req, res);
    }
};