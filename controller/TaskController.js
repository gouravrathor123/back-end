const taskServ = require("../services/TaskService");
const utils = require("../utils/utils");

module.exports = {
    addTask: async function (req, res) {
        let result = await taskServ.addTask(req);
        utils.sendResponse(result, req, res);
    },


    editTask: async function (req, res) {
        let {
            id
        } = req.params;
        let result = await taskServ.editTask(req.body, id);
        utils.sendResponse(result, req, res);
    },

    deleteTask: async function (req, res) {
        let {
            id
        } = req.params;
        let result = await taskServ.deleteTask(id);
        utils.sendResponse(result, req, res);
    },

    getAllTask: async function (req, res) {
        let result = await taskServ.getAllTask(req);
        utils.sendResponse(result, req, res);
    },

    getAllEmployee: async function(req,res){
        let {
            id
        } = req.params;
        let result = await taskServ.getAllEmployee(req,id);
        utils.sendResponse(result,req,res);
    },

    getTaskByID: async function(req,res){
        let {
            id
        } = req.params;
        let result = await taskServ.getTaskByID(id);
        utils.sendResponse(result,req,res);
    },

    getCompletedTask: async function(req,res){
        let result = await taskServ.getCompletedTask(req);
        utils.sendResponse(result,req,res);
    },

    getIncompletedTask: async function(req,res){
        let result = await taskServ.getIncompletedTask(req);
        utils.sendResponse(result,req,res);
    },
}