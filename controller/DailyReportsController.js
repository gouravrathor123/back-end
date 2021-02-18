const dailyreportServ = require("../services/DailyReportsService");
const utils = require("../utils/utils");

module.exports = {
    add: async function (req, res) {
        let result = await dailyreportServ.add(req);
        utils.sendResponse(result, req, res);
    },

    edit: async function (req, res) {
        let {
            id
        } = req.params;
        let result = await dailyreportServ.update(req, id);
        utils.sendResponse(result, req, res);
    },

    // get: async function (req, res) {
    //     let {
    //         id
    //     } = req.params;
    //     let result = await catalogServ.get(id);
    //     utils.sendResponse(result, req, res);
    // },

    getlistforuser: async function(req,res){
        let result = await dailyreportServ.getlistforuser(req);
        utils.sendResponse(result,req,res);
    },

    getlistforowner: async function(req,res){
        let result = await dailyreportServ.getlistforowner(req);
        utils.sendResponse(result,req,res);
    },

    delete: async function (req, res) {
        let {
            id
        } = req.params;
        let result = await dailyreportServ.delete(id);
        utils.sendResponse(result, req, res);
    },
};