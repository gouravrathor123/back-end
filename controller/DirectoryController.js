const directoryServ = require("../services/DirectoryService");
const utils = require("../utils/utils");

module.exports = {
    add: async function (req, res) {
        let result = await directoryServ.add(req);
        utils.sendResponse(result, req, res);
    },

    edit: async function (req, res) {
        let {
            id
        } = req.params;
        let result = await directoryServ.update(req, id);
        utils.sendResponse(result, req, res);
    },

    // get: async function (req, res) {
    //     let {
    //         id
    //     } = req.params;
    //     let result = await todoServ.get(id);
    //     utils.sendResponse(result, req, res);
    // },

    delete: async function (req, res) {
        let {
            id
        } = req.params;
        let result = await directoryServ.delete(id);
        utils.sendResponse(result, req, res);
    },

    list: async function (req, res) {
        let {
            id
        } = req.params;
        let result = await directoryServ.list(id);
        utils.sendResponse(result, req, res);
    }
};