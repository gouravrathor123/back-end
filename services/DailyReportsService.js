const DailyReportsController = require("../controller/DailyReportsController");
const DailyReports = require("../models/DailyReports");
const Employee = require("../models/Employee");
const Owner = require("../models/Owner");

module.exports = {
    add: async function (req) {
        try {
            const employeeid = req.employee;
            const employee = await Employee.findById(employeeid);
            const owner = await Owner.find({
                company_code:employee.company_code
            });
            Object.assign(req.body,{user_id:employeeid,owner_id:owner[0]._id});
            const result1 = await DailyReports.find(req.body);
            if(result1.length!==0){
                throw Error("Report already exists")
            }
            result=await DailyReports.create(req.body);
            return{result,message:"Report created succesfully"};
        } catch (err) {
            return {
                error: err.message
            };
        }
    },

    update: async function (req, id) {
        let result = null;
        try {
            if (Object.keys(req.body).length === 0) {
                throw Error("Body can not be empty");
            }
            let result1 = await DailyReports.findById(id);
            if (!result1) {
                throw Error("No Report is found");
            }
            await DailyReports.findByIdAndUpdate(id, {
                report:req.body.report
            });
            result = await DailyReports.findOne({
                _id: id
            });
            return {
                result,
                message: "Report details updated "
            }
        } catch (err) {
            return {
                error: err.message
            }
        }
    },

    getlistforuser: async function (req) {
        let result = null;
        try {
            user=req.employee;
            result = await DailyReports.find({user_id:user._id});
            return{result,message:"this is the list of all daily reports"};
        } catch (err) {
            return {
                error: err.message
            };
        }
    },

    getlistforowner: async function (req) {
        let result = null;
        try {
            let user=req.owner;
            result = await DailyReports.find({owner_id:user._id});
            return{result,message:"this is the list of all daily reports"};
        } catch (err) {
            return {
                error: err.message
            };
        }
    },

    getAll: async function (req){        
        let result = null;
        try{
            let owner = req.owner;
            result = await Catalog.find({company_name:owner.company_name});
            if(result.length===0){
                throw Error("no catalog found");
            }
            return{result,message:"all catalog for the perticular owner"}
        }catch(err){
            return{error:err.message}
        }
    },

    delete: async function (id) {
        let result = null;
        try {
            result = await DailyReports.findById(id);
            if (result) {
                result = await DailyReports.findByIdAndDelete(id);
                return {
                    result: 1,
                    message: "Report deleted successfully"
                };
            } else {
                throw Error(`no report found for this id: ${id}`)
            }
        } catch (err) {
            return {
                error: err.message
            }
        }
    }
}