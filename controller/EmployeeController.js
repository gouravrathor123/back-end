const employeeServ = require("../services/EmployeeService");
const utils = require("../utils/utils");

module.exports = {
    add: async function (req, res) {
        let result = await employeeServ.add(req.body);
        utils.sendResponse(result, req, res);
    }
};