const express = require('express');
const Owner = require("../models/Owner");
const Task = require('../models/Task');
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Employee = require('../models/Employee');
const Oauth = require('../middleware/Owner/Oauth');

module.exports = {
    addTask: async function (req) {
        let result = null;
        try {
            let owner = req.owner;
            let EcompanyCode = await Employee.findById(req.body.assigned_to);
            let OcompanyCode = await Owner.findById(owner._id);
            if (EcompanyCode.company_code !== OcompanyCode.company_code) {
                throw Error("you cant assign task to this user");
            }
            const result1 = await Task.findOne({
                title: req.body.title,
                assigned_by: owner._id,
                assigned_to: req.body.assigned_to
            })
            if (result1) {
                throw Error("This item is already there");
            }
            Object.assign(req.body, {assigned_by: owner._id});
            Object.assign(req.body, {});
            result = await Task.create(req.body);
            console.log(result);
            return {
                result,
                message: "task assigned"
            };
        } catch (err) {
            return {
                error: err.message
            };
        }
    },

    editTask: async function (task, id) {
        let result = null;
        try {
            if (Object.keys(task).length === 0) {
                throw Error("Body can not be empty");
            }
            let result1 = await Task.findById(id);
            console.log(result1);
            if (!result1) {
                throw Error("No Task is found");
            }
            await Task.findByIdAndUpdate(id, {
                title:task.title,
                description:task.description,
                status: task.status,
                due_date:task.due_date
            });
            result = await Task.findOne({
                _id: id
            });
            return {
                result,
                message: "Task updated"
            }
        } catch (err) {
            return {
                error: err.message
            }
        }
    },

    deleteTask: async function (id) {
        let result = null;
        try {
            result = await Task.findById(id);
            if (result) {
                result = await Task.findByIdAndDelete(id);
                return {
                    result: 1,
                    message: "Task deleted successfully"
                };
            } else {
                throw Error(`no task found for this id: ${id}`)
            }
        } catch (err) {
            return {
                error: err.message
            }
        }
    },

    getAllTask: async function (req) {
        let result = null;
        try {
            result = await Task.find({
                assigned_by: req.owner._id
            });

            if (result.length === 0) {
                throw Error("No task found");
            }
            return {
                result,
                message: "list of all tasks assigned by this owner"
            };
        } catch (err) {
            return {
                error: err.message
            };
        }
    },

    getAllEmployee: async function(req,id){
        let result = [];
        try{
            result = await Employee.find({
                company_code:req.owner.company_code
            });
            var re= [];
            var rew={};
            for(var i=0;i<result.length;i++){
                re[result[i]._id]=result[i].first_name+" "+result[i].last_name;
            }
            Object.assign(rew,re);
            console.log(rew);
            result=rew;
            return{result,message:"List of all employees"}
        }catch(err){
            return{
                error:err.message
            }
        }
    },

    getTaskByID: async function(id){
        let result = null;
        try{
            result = await Task.findById(id);
            return{result};
        }catch(err){
            return{error:err.message};    
        }
    },

    getCompletedTask: async function(req){
        let result = null;
        try{
            const id = req.owner._id;
            result = await Task.find({
                assigned_by:id,
                status:true
            });
            return{result};
        }catch(err){
            return{error:err.message};
        }
    },

    getEmpCompletedTask: async function(req){
        let result = null;
        try{
            const id = req.employee._id;
            result = await Task.find({
                assigned_to:id,
                status:true
            });
            
            return{result};
        }catch(err){
            return{error:err.message};
        }
    },

    getIncompletedTask: async function(req){
        let result = null;
        try{
            const id = req.owner._id;
            result = await Task.find({
                assigned_by:id,
                status:false
            });
            return{result};
        }catch(err){
            return{error:err.message};
        }
    },

    getEmpIncompletedTask: async function(req){
        let result = null;
        try{
            const id = req.employee._id;
            result = await Task.find({
                assigned_to:id,
                status:false
            });
            console.log(result);
            return{result};
        }catch(err){
            return{error:err.message};
        }
    },

}