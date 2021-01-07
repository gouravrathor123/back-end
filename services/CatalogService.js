const Catalog = require("../models/Catolog");

module.exports = {
    add: async function (req) {
        try {
            const owner = req.owner
            const body = req.body
            Object.assign(body,{company_name:owner.company_name,email:owner.email,phone:owner.phone,address:owner.address});
            const result1 = await Catalog.find(body);
            if(result1){
                throw Error("Catalog already exists")
            }
            const result = await Catalog.create(body);
            return{result,message:"Catalog created succesfully"};
            // console.log(body);
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
            let result1 = await Todo.findById(id);
            if (!result1) {
                throw Error("No Todo is found");
            }
            await Todo.findByIdAndUpdate(id, {
                description: req.description,
                completed: req.completed
            });
            result = await Todo.findOne({
                _id: id
            });
            return {
                result,
                message: "description updated"
            }
        } catch (err) {
            return {
                error: err.message
            }
        }
    },

    get: async function (id) {
        let result = null;
        try {
            result = await Todo.findById(id);
            if (!result) {
                throw Error("no todo found");
            }
            return {
                result,
                message: "todo found"
            };
        } catch (err) {
            return {
                error: err.message
            };
        }
    },

    delete: async function (id) {
        let result = null;
        try {
            result = await Todo.findById(id);
            if (result) {
                result = await Todo.findByIdAndDelete(id);
                return {
                    result: 1,
                    message: "Todo deleted successfully"
                };
            } else {
                throw Error(`no todo found for this id: ${id}`)
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
            result = await Todo.find({
                owner: id
            });
            return {
                result,
                message: "list of all tasks of this users"
            };
        } catch (err) {
            return {
                error: err.message
            };
        }
    }
}