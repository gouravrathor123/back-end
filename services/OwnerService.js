const express = require('express');
const Owner = require("../models/Owner");
const Task = require('../models/Task');
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Vonage = require('@vonage/server-sdk');
const Employee = require('../models/Employee');


module.exports = {
    add: async function (owner) {
        let result = null;
        let token = null;
        try {
            let ow = await Owner.findOne({
                email: owner.email
            });
            let ow1 = await Owner.findOne({
                phone: owner.phone
            });
            let code = owner.company_name + "456";
            Object.assign(owner, {
                company_code: code
            });
            if (ow) {
                throw new Error("Email already registerd");
            } else if (ow1) {
                throw new Error("Phone Number is already registerd")
            } else {
                const own = new Owner(owner);
                token = await own.generateAuthToken();
                result = await Owner.findOne({
                    _id: own._id
                });
            }
            return {
                result,
                token,
                message: "Owner added successfully"
            }
        } catch (err) {
            return {
                error: err.message
            };
        }
    },

    update: async function (req, id) {
        let result = null;
        try {
            if (Object.keys(req).length === 0) {
                throw Error("Body can not be empty");
            }
            let result1 = await Owner.findById(id);
            if (!result1) {
                throw Error("Owner not found");
            }
            await Owner.findByIdAndUpdate(id, {
                first_name: req.first_name,
                last_name: req.last_name,
                password: req.password,
                date_of_birth: req.date_of_birth,
                company_name: req.company_name,
                industry: req.industry,
                CIN: req.CIN,
                address: req.address
            });
            result = await Owner.findOne({
                _id: id
            });
            return {
                result,
                message: "Profile successfully updated."
            }
        } catch (err) {
            return {
                error: err.message
            }
        }
    },

    delete: async function (id) {
        let result = null;
        try {
            result = await Owner.findById(id);
            if (result) {
                result = await Owner.findByIdAndDelete(id);
                return {
                    result: 1,
                    message: "Owner deleted successfully"
                };
            } else {
                throw Error(`no owner found for this id: ${id}`)
            }

        } catch (err) {
            return {
                error: err.message
            };
        }
    },

    get: async function (id) {
        let result = null;
        try {
            result = await Owner.findById(id);
            if (!result) {
                throw Error("Owner not found");
            }
            return {
                result,
                message: "Owner found"
            };
        } catch (err) {
            return {
                error: err.message
            };
        };
    },

    list: async function () {
        let result = null;
        try {
            result = await Owner.find();
            if (!result) {
                throw Error("No Owner found");
            }
            return {
                result,
                message: "List of all Owners"
            }
        } catch (err) {
            return {
                error: err.message
            };
        }
    },

    login: async function (req) {
        let result = null;
        try {
            const result = await Owner.findOne({
                phone: req.phone
            });
            if (!result) {
                throw new Error('Unable to login');
            }
            const isMatch = await bcrypt.compare(req.password, result.password);

            if (!isMatch) {
                throw new Error('Unable to login');
            }

            return {
                result,
                message: "Owner loged in successfully"
            };
        } catch (err) {
            return {
                error: err.message
            };
        }
    },

    forgotPassword: async function (email) {
        let result = null;
        try {
            result = await Owner.findOne({
                email: email
            });
            if (result && result.id) {
                randomkey = parseInt(crypto.randomBytes(3).toString("hex"), 16).toString().substr(0, 6);
                let date = Date.now() + 86400000;
                await Owner.findByIdAndUpdate(result._id, {
                    reset_password_token: randomkey,
                    reset_password_expires: date
                });

                let transporter = await nodemailer.createTransport({
                    host: process.env.EMAIL_HOST,
                    port: process.env.EMAIL_PORT,
                    secure: true, // true for 465, false for other ports
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.EMAIL_PASSWORD
                    }
                });
                await transporter.sendMail({
                    from: process.env.EMAIL,
                    to: result.email,
                    subject: "Password help has arrived!",
                    text: "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
                        "Please use this verification code when you are changing password.\n\n" +
                        randomkey + "\n\n" +
                        "If you did not request this, please ignore this email and your password will remain unchanged.\n"
                });
            } else if (result === null) {
                throw new Error("Email id does not exists, please check");
            }
            return {
                result: true,
                message: "Mail has been sent, please check your inbox or span folder"
            };
        } catch (err) {
            return {
                error: err.message
            };
        }
    },

    resetPassword: async function (passcode, password, email) {
        let result = null;
        try {
            console.log(Date.now() + 86400000);
            result = await Owner.findOne({
                reset_password_token: passcode,
                email: email
            }); //some problem with expire
            if (result) {
                let newPasswordEnc = bcrypt.hashSync(password, 8);
                await Owner.findByIdAndUpdate(result._id, {
                    reset_password_token: null,
                    password: newPasswordEnc
                });
                let transporter = await nodemailer.createTransport({
                    host: process.env.EMAIL_HOST,
                    port: process.env.EMAIL_PORT,
                    secure: true, // true for 465, false for other ports
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.EMAIL_PASSWORD
                    }
                });
                await transporter.sendMail({
                    from: process.env.EMAIL,
                    to: result.email,
                    subject: "Password reset confirmation",
                    text: "This is a confirmation that the password for your account " +
                        result.email +
                        " has just been changed.\n"
                });
                return {
                    result: true,
                    message: "Password changed successfully"
                };
            } else {
                throw Error("Sorry invalid passcode for this email id.Please try agian.");
            }
            return {
                result
            };
        } catch (err) {
            return {
                error: err.message
            };
        }
    },

    register: async function (phone) {
        let result = null;
        try {
            result1 = await Owner.find({
                phone: phone
            });
            if (result1.length > 0) {
                throw Error("Phone no already registerd");
            }

            // const vonage = new Vonage({
            //     apiKey: '699b16a6',
            //     apiSecret: '4XNMOaD4GMvdoEkI'
            // });

            // const from = "Gourav Rathor";
            // const to = phone;
            // const text = 'A text message sent using the Vonage SMS API';

            // vonage.message.sendSms(from, to, text, (err, responseData) => {
            //     if (err) {
            //         console.log(err);
            //     } else {
            //         if (responseData.messages[0]['status'] === "0") {
            //             console.log(`Message sent successfully. to ${to}`);
            //         } else {
            //             console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            //         }
            //     }
            // })


            return {
                result: 1,
                message: "An otp is sent to your phone"
            };
        } catch (err) {
            return {
                error: err.message
            };
        }
    },

    verify: async function (otp) {

    },

    addTask: async function (task) {
        let result = null;
        try {

            let EcompanyCode = await Employee.findById(task.assigned_to);
            let OcompanyCode = await Owner.findById(task.assigned_by);
            if (EcompanyCode.company_code !== OcompanyCode.company_code) {
                throw Error("you cant assign task to this user");
            }
            const result1 = await Task.findOne({
                task: task.task,
                assigned_by: task.assigned_by,
                assigned_to: task.assigned_to
            })
            if (result1) {
                throw Error("This item is already there");
            }
            result = await Task.create(task);
            return {
                result,
                message: "task assigned"
            };
        } catch (err) {
            return {
                error: err.message
            };
        }
    },

    editTask: async function (task, id) {
        let result = null;
        try {
            if (Object.keys(task).length === 0) {
                throw Error("Body can not be empty");
            }
            let result1 = await Task.findById(id);
            console.log(result1);
            if (!result1) {
                throw Error("No Task is found");
            }
            await Task.findByIdAndUpdate(id, {
                task: task.task,
                completed: task.completed
            });
            result = await Task.findOne({
                _id: id
            });
            return {
                result,
                message: "Task updated"
            }
        } catch (err) {
            return {
                error: err.message
            }
        }
    },

    deleteTask: async function (id) {
        let result = null;
        try {
            result = await Task.findById(id);
            if (result) {
                result = await Task.findByIdAndDelete(id);
                return {
                    result: 1,
                    message: "Task deleted successfully"
                };
            } else {
                throw Error(`no task found for this id: ${id}`)
            }
        } catch (err) {
            return {
                error: err.message
            }
        }
    },

    getAllTask: async function (id) {
        let result = null;
        try {
            result = await Task.find({
                assigned_by: id
            });
            if (result.length) {
                throw Error("No task found");
            }
            return {
                result,
                message: "list of all tasks assigned by this owner"
            };
        } catch (err) {
            return {
                error: err.message
            };
        }
    }

}