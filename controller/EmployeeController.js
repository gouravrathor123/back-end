const employeeServ = require("../services/EmployeeService");
const utils = require("../utils/utils");

module.exports = {
    add: async function (req, res) {
        let result = await employeeServ.add(req.body);
        utils.sendResponse(result, req, res);
    },

    edit: async function (req, res) {
        let {
            id
        } = req.params;
        let result = await employeeServ.update(req.body, id);
        utils.sendResponse(result, req, res);
    },

    delete: async function (req, res) {
        let {
            id
        } = req.params;
        let result = await employeeServ.delete(id);
        utils.sendResponse(result, req, res);
    },

    get: async function (req, res) {
        let {
            id
        } = req.params;
        let result = await employeeServ.get(id);
        utils.sendResponse(result, req, res);
    },

    list: async function(req,res){
        let result = await employeeServ.list();
        utils.sendResponse(result,req,res);
    },
};