const productServ = require("../services/ProductService");
const utils = require("../utils/utils");

module.exports = {
    add: async function (req, res) {
        let result = await productServ.add(req);
        utils.sendResponse(result, req, res);
    },

    edit: async function (req, res) {
        let {
            id
        } = req.params;
        let result = await productServ.update(req, id);
        utils.sendResponse(result, req, res);
    },

    get: async function (req, res) {
        let {
            id
        } = req.params;
        let result = await productServ.get(id);
        utils.sendResponse(result, req, res);
    },

    getAll: async function(req,res){
        let result = await productServ.getAll(req);
        utils.sendResponse(result,req,res);
    },

    delete: async function (req, res) {
        let {
            id
        } = req.params;
        let result = await productServ.delete(id);
        utils.sendResponse(result, req, res);
    },
};