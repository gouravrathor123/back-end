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

    list: async function (req, res) {
        let result = await employeeServ.list();
        utils.sendResponse(result, req, res);
    },

    login: async function (req, res) {
        let result = await employeeServ.login(req.body)
        utils.sendResponse(result, req, res);
    },

    forgetPassword: async function (req, res) {
        let result = await employeeServ.forgotPassword(req.body.email);
        utils.sendResponse(result, req, res);
    },

    resetPassword: async function (req, res) {
        let result = await employeeServ.resetPassword(req.body.passcode, req.body.password, req.body.email);
        utils.sendResponse(result, req, res);
    },

    register: async function (req, res) {
        let result = await employeeServ.register(req.body.phone);
        utils.sendResponse(result, req, res);
    },

    verify: async function (req, res) {
        let result = await employeeServ.register(req.body.otp);
        utils.sendResponse(result, req, res);
    },


    getTasks: async function (req, res) {
        let {
            id
        } = req.params;
        let result = await employeeServ.getTasks(id);
        utils.sendResponse(result, req, res);
    },

    editTask: async function (req, res) {
        let {
            id
        } = req.params;
        let result = await employeeServ.editTask(req.body, id);
        utils.sendResponse(result, req, res);
    }
};