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
        let result = await catalogServ.update(req, id);
        utils.sendResponse(result, req, res);
    },

    get: async function (req, res) {
        let {
            id
        } = req.params;
        let result = await catalogServ.get(id);
        utils.sendResponse(result, req, res);
    },

    getAll: async function(req,res){
        let result = await catalogServ.getAll(req);
        utils.sendResponse(result,req,res);
    },

    delete: async function (req, res) {
        let {
            id
        } = req.params;
        let result = await catalogServ.delete(id);
        utils.sendResponse(result, req, res);
    },
};