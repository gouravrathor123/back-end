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
}