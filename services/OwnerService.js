const Owner = require("../models/Owner");

module.exports = {
    add: async function (owner) {
        let result = null;
        let token = null;
        try {
            let ow = await Owner.findOne({
                email: owner.email
            });
            if (ow) {
                throw new Error("Email already registerd");
            } else {
                const own = new Owner(owner);
                token = await own.generateAuthToken();
                result = await Owner.findOne({
                    _id: own._id
                });
            }
            return {
                result,
                token,
                message: "Owner added successfully"
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
            await Owner.findByIdAndUpdate(id, {
                first_name: req.first_name,
                last_name: req.last_name,
                password: req.password,
                date_of_birth: req.date_of_birth,
                company_name: req.company_name,
                industry: req.industry,
                CIN: req.CIN,
                address: req.address
            });
            result = await Owner.findOne({
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
            result = await Owner.findById(id);
            if (result) {
                result = await Owner.findByIdAndDelete(id);
                return {
                    result: 1,
                    message: "Owner deleted successfully"
                };
            } else {
                throw Error(`no owner found for this id: ${id}`)
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
            result = await Owner.findById(id);
            if (!result) {
                throw Error("Owner not found");
            }
            return {
                result,
                message: "Owner found"
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
            result = await Owner.find();
            if(!result){
                throw Error("No Owner found");
            }
            return {
                result,
                message:"List of all Owners"
            }
        }catch(err){
            return{error:err.message};
        }
    },
}