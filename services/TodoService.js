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
      
    }
}