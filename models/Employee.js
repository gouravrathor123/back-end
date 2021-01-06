const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
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
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    occupation: {
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
    company_code: {
        type: String,
    },
    createdBy: {
        type: String, //E for employee and C for company owner
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

employeeSchema.methods.EgenerateAuthToken = async function () {
    const employee = this;
    const token = jwt.sign({
        _id: employee._id.toString()
    }, process.env.JWT_SECRET);
    employee.tokens = employee.tokens.concat({
        token: token
    });
    await employee.save();
    return token;
}

employeeSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
})

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;