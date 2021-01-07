const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
    },
    image:{
        type:String,
    }
    
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;