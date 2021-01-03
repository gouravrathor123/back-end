const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner_type:{
        type:String, //E for employee and C for company
        required:true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    }
}, {
    timestamps: true 
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;