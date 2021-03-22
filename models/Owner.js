const mongoose = require('mongoose');
const validator = require('validator');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const ownerSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    avatar:{
        type: String,
        default:""
    },
    company_name: {
        type: String,
        required: true,
        unique:true
    },
    company_code: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    industry: {
        type: String,
        required: true
    },
    reset_password_token: {
        type: String
    },
    reset_password_expires: {
        type: String
    },
    otp: {
        type: String
    },
    CIN: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
});

ownerSchema.methods.OgenerateAuthToken = async function () {
    const owner = this;
    const token = jwt.sign({
        _id: owner._id.toString()
    }, process.env.JWT_SECRET);
    owner.tokens = owner.tokens.concat({
        token: token
    });
    await owner.save();
    return token;
};



ownerSchema.pre('save', async function (next) {
    const owner = this;

    if (owner.isModified('password')) {
        owner.password = await bcrypt.hash(owner.password, 8);
    }

    next();
});


const Owner = mongoose.model('Owner', ownerSchema);

module.exports = Owner;