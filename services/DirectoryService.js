const Directory = require("../models/Directory");

module.exports = {
    add: async function (req) {
        try {
            console.log(req.owner);
            const result1 = await Directory.findOne({
                name:req.body.name,
                phone:req.body.phone,
                owner:req.owner._id
            })
            Object.assign(req.body,{owner:req.owner._id});
            if (result1) {
                throw Error("This contect is already there");
            }
            const result = await Directory.create(req.body);
            return {
                result
            };
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
            let result1 = await Directory.findById(id);
            if (!result1) {
                throw Error("No Contact is found");
            }
            await Directory.findByIdAndUpdate(id, {
                name: req.body.name,
                phone: req.body.phone
            });
            result = await Directory.findOne({
                _id: id
            });
            return {
                result,
                message: "Contact updated"
            }
        } catch (err) {
            return {
                error: err.message
            }
        }
    },

    // get: async function (id) {
    //     let result = null;
    //     try {
    //         result = await Todo.findById(id);
    //         if (!result) {
    //             throw Error("no todo found");
    //         }
    //         return {
    //             result,
    //             message: "todo found"
    //         };
    //     } catch (err) {
    //         return {
    //             error: err.message
    //         };
    //     }
    // },

    delete: async function (id) {
        let result = null;
        try {
            result = await Directory.findById(id);
            if (result) {
                result = await Directory.findByIdAndDelete(id);
                return {
                    result: 1,
                    message: "Contact deleted successfully"
                };
            } else {
                throw Error(`no contact found for this id: ${id}`)
            }
        } catch (err) {
            return {
                error: err.message
            }
        }
    },

    list: async function (id) {
        let result = null;
        try {
            result = await Directory.find({
                owner: id
            });
            return {
                result,
                message: "list of all contacts of this users"
            };
        } catch (err) {
            return {
                error: err.message
            };
        }
    }
}