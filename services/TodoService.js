const Todo = require("../models/Todo");

module.exports = {
    add: async function(todo){
        try{
            const result1 = await Todo.findOne({
                description:todo.description,
                owner:todo.owner
            })
            if(result1){
                throw Error("This item is already there");
            }
            const result = await Todo.create(todo);
            return{result};
        }catch(err){
            return{error:err.message};
        }
    },

    update: async function (req, id) {
        let result = null;
        try {
            if(Object.keys(req.body).length === 0){
                throw Error("Body can not be empty");
            }
            let result1 = await Todo.findById(id);
            if(!result1){
                throw Error("No Todo is found");
            }
            await Todo.findByIdAndUpdate(id, {
               description:req.description,
               completed:req.completed
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

    get: async function(id){
        let result = null;
        try{
            result = await Todo.findById(id);
            if(!result){
                throw Error("no todo found");
            }
            return{result,message:"todo found"};
        }catch(err){
            return{error:err.message};
        }
    },

    delete: async function(id){
        let result = null;
        try{
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
        }catch(err){
            return{error:err.message}
        }
    },

    list: async function(id){
        let result = null;
        try{
           result = await Todo.find({owner:id});
           return{result,message:"list of all tasks of this users"};
        }catch(err){
            return {error:err.message};
        }
    }
}