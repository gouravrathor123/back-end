const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

const catalogSchema = new Schema({
    company_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    phone: {
        type: String,
        required: true,
    },
    address:{
        type:String
    },
    products: [{
        product: {
            type: String,
            required: true
        }
    }],
    social_links: [{
        fb_link:{type:String},
        tw_link:{type:String},
        ig_link:{type:String}
    }],
    video_url:{
        type:String
    }
}, {
    timestamps: true
});

const Catalog = mongoose.model('Catalog', catalogSchema);

module.exports = Catalog;