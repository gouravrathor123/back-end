const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

const directorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type:String,
        required : true,
        unique:true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
});

const Directory = mongoose.model('Directory', directorySchema);

module.exports = Directory;