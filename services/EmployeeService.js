const Employee = require("../models/Employee");

module.exports = {
    add: async function (employee) {
        let result = null;
        let token = null;
        try {
            let usr = await Employee.findOne({
                email: employee.email
            });
            let usr1 = await Employee.findOne({
                phone:employee.phone
            });
            if (usr) {
                throw new Error("Email already registerd");
            }
            else if(usr1){
                throw new Error("Phone no. is already registerd")
            }
            else {
                const employe = new Employee(employee);
                token = await employe.generateAuthToken();

                result = await Employee.findOne({
                    _id: employe._id
                });
            }
            return {
                result,
                token,
                message: "Employee added successfully"
            }
        } catch (err) {
            return {
                error: err.message
            };
        }
    },

    update: async function (req, id) {
        let result = null;
        try {
            let result1 = await Employee.findById(id);
            if(!result1){
                throw Error("No Employee found");
            }
            await Employee.findByIdAndUpdate(id, {
                first_name: req.first_name,
                last_name: req.last_name,
                password: req.password,
                date_of_birth: req.date_of_birth,
                occupation: req.occupation
            });
            result = await Employee.findOne({
                _id: id
            });
            return {
                result,
                message: "Profile successfully updated."
            }
        } catch (err) {
            return {
                error: err.message
            }
        }
    },

    delete: async function (id) {
        let result = null;
        try {
            result = await Employee.findById(
                id
            );
            if (result) {
                result = await Employee.findByIdAndDelete(id);
                return {
                    result: 1,
                    message: "Employee deleted successfully"
                };
            } else {
                throw Error(`no employee found for this id: ${id}`)
            }

        } catch (err) {
            return {
                error: err.message
            };
        }
    },

    get: async function (id) {
        let result = null;
        try {
            result = await Employee.findById(id);
            if (!result) {
                throw Error("Employee not found");
            }
            return {
                result,
                message: "Employee found"
            };
        } catch (err) {
            return {
                error: err.message
            };
        };
    },

    list: async function (){
        let result = null;
        try{
            result = await Employee.find();
            if(!result){
                throw Error("No Employee found");
            }
            return {
                result,
                message:"List of all Employees"
            }
        }catch(err){
            return{error:err.message};
        }
    },

}