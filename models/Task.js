const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    task: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
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
    }
}, {
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;