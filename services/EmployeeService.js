const Employee = require("../models/Employee");

module.exports = {
    add: async function (employee) {
        let result = null;
        try {
            const employe = new Employee(employee);
            let usr = await Employee.findOne({
                email: employee.email
            });
            if (usr) {
                throw new Error("Email already registerd");
            } else {
                let result1 = await Employee.create(employee);
                result = await Employee.findOne({
                    _id: result1._id
                });
            }
            const token = await employe.generateAuthToken();
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
    }
}