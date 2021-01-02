const ownerServ = require("../services/OwnerService");
const utils = require("../utils/utils");

module.exports = {
    add: async function (req, res) {
        let result = await ownerServ.add(req.body);
        utils.sendResponse(result, req, res);
    },

    edit: async function (req, res) {
        let {
            id
        } = req.params;
        let result = await ownerServ.update(req.body, id);
        utils.sendResponse(result, req, res);
    },

    delete: async function (req, res) {
        let {
            id
        } = req.params;
        let result = await ownerServ.delete(id);
        utils.sendResponse(result, req, res);
    },

    get: async function (req,res){
        let {id} = req.params;
        let result = await ownerServ.get(id);
        utils.sendResponse(result,req,res);
    },

    list: async function(req,res){
        let result = await ownerServ.list();
        utils.sendResponse(result,req,res);
    },
};