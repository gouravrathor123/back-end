const todoServ = require("../services/TodoService");
const utils = require("../utils/utils");

module.exports = {
    add: async function (req, res) {
        let result = await todoServ.add(req.body);
        utils.sendResponse(result, req, res);
    },

    edit: async function (req, res) {
        let {
            id
        } = req.params;
        let result = await todoServ.update(req, id);
        utils.sendResponse(result, req, res);
    },

    get: async function (req, res) {
        let {
            id
        } = req.params;
        let result = await todoServ.get(id);
        utils.sendResponse(result, req, res);
    },

    delete: async function (req, res) {
        let {
            id
        } = req.params;
        let result = await todoServ.delete(id);
        utils.sendResponse(result, req, res);
    },

    list: async function (req, res) {
        let {
            id
        } = req.params;
        let result = await todoServ.list(id);
        utils.sendResponse(result, req, res);
    }
};