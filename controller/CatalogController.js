const catalogServ = require("../services/CatalogService");
const utils = require("../utils/utils");

module.exports = {
    add: async function (req, res) {
        let result = await catalogServ.add(req);
        utils.sendResponse(result, req, res);
    },

    edit: async function (req, res) {
        let {
            id
        } = req.params;
        let result = await todoServ.update(req.body, id);
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