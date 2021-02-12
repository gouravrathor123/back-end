const Owner = require("../models/Owner");
const ownerServ = require("../services/OwnerService");
const utils = require("../utils/utils");

module.exports = {
    add: async function (req, res) {
        let result = await ownerServ.add(req.body);
        if(result.error){
            utils.sendResponse(result,req,res.status(401));
        }
        else{
            utils.sendResponse(result,req,res.status(200));
        }
    },

    check: async function (req,res){
        let result = await ownerServ.check(req.body);
        if(result.error){
            utils.sendResponse(result,req,res.status(401));
        }
        else{
            utils.sendResponse(result,req,res.status(200));
        }
    },

    edit: async function (req, res) {
        let result = await ownerServ.update(req);
        utils.sendResponse(result, req, res);
    },

    delete: async function (req, res) {
        let result = await ownerServ.delete(req);
        utils.sendResponse(result, req, res);
    },

    // get: async function (req, res) {
    //     let {
    //         id
    //     } = req.params;
    //     let result = await ownerServ.get(id);
    //     utils.sendResponse(result, req, res);
    // },

    getProfile: async function (req, res) {
        let result = await ownerServ.getProfile(req);
        utils.sendResponse(result, req, res);
    },

    list: async function (req, res) {
        let result = await ownerServ.list();
        utils.sendResponse(result, req, res);
    },

    login: async function (req, res) {
        let result = await ownerServ.login(req.body)
        if(result.error){
            utils.sendResponse(result,req,res.status(401));
        }
        else{
            utils.sendResponse(result,req,res.status(200));
        }
    },

    forgetPassword: async function (req, res) {
        let result = await ownerServ.forgotPassword(req.body.email);
        utils.sendResponse(result, req, res);
    },

    resetPassword: async function (req, res) {
        let result = await ownerServ.resetPassword(req.body.passcode, req.body.password, req.body.email);
        utils.sendResponse(result, req, res);
    },

    register: async function (req, res) {
        let result = await ownerServ.register(req.body.phone);
        utils.sendResponse(result, req, res);
    },

    verify: async function (req, res) {
        let result = await ownerServ.register(req.body.otp);
        utils.sendResponse(result, req, res);
    },

    logout: async function (req, res) {
        let result = await ownerServ.logout(req);
        utils.sendResponse(result, req, res);
    },
};