const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description:{
        type:String,
        required:true,
    },
    due_date:{
        type:Date,
        required:true
    },
    status: {
        type: Boolean,
        default: false
    },
    assigned_to: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    assigned_by: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    completed_at:{
        type:String,
    }
}, {
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;