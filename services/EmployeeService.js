const express = require('express');
const Owner = require("../models/Owner");
const Task = require('../models/Task');
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Vonage = require('@vonage/server-sdk');
const Employee = require('../models/Employee');

module.exports = {
    add: async function (employee) {
        let result = null;
        let token = null;
        try {
            let usr = await Employee.findOne({
                email: employee.email
            });
            let usr1 = await Employee.findOne({
                phone: employee.phone
            });
            if (usr) {
                throw new Error("Email already registerd");
            } else if (usr1) {
                throw new Error("Phone no. is already registerd")
            } else {
                const employe = new Employee(employee);
                token = await employe.generateAuthToken();

                result = await Employee.findOne({
                    _id: employe._id
                });
            }
            return {
                result,
                token,
                message: "Employee added successfully"
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
            let result1 = await Employee.findById(id);
            if (!result1) {
                throw Error("No Employee found");
            }
            await Employee.findByIdAndUpdate(id, {
                first_name: req.first_name,
                last_name: req.last_name,
                password: req.password,
                date_of_birth: req.date_of_birth,
                occupation: req.occupation
            });
            result = await Employee.findOne({
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
            result = await Employee.findById(
                id
            );
            if (result) {
                result = await Employee.findByIdAndDelete(id);
                return {
                    result: 1,
                    message: "Employee deleted successfully"
                };
            } else {
                throw Error(`no employee found for this id: ${id}`)
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
            result = await Employee.findById(id);
            if (!result) {
                throw Error("Employee not found");
            }
            return {
                result,
                message: "Employee found"
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
            result = await Employee.find();
            if (!result) {
                throw Error("No Employee found");
            }
            return {
                result,
                message: "List of all Employees"
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
            const result = await Employee.findOne({
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
            result = await Employee.findOne({
                email: email
            });
            if (result && result.id) {
                randomkey = parseInt(crypto.randomBytes(3).toString("hex"), 16).toString().substr(0, 6);
                let date = Date.now() + 86400000;
                await Employee.findByIdAndUpdate(result._id, {
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
            result = await Employee.findOne({
                reset_password_token: passcode,
                email: email
            }); //some problem with expire
            if (result) {
                let newPasswordEnc = bcrypt.hashSync(password, 8);
                await Employee.findByIdAndUpdate(result._id, {
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
            result1 = await Employee.find({
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

    getTasks: async function (id) {
        let result = null;
        try {
            result = await Task.find({
                assigned_to: id
            });
            if (result.length === 0) {
                throw Error("There is no task for you");
            }
            return {
                result,
                message: "Here is the list of all Tasks that are assigned to you"
            }
        } catch (err) {
            return {
                error: err.message
            };
        }
    },

    editTask: async function (req, id) {
        let result = null;
        try {
            if (Object.keys(req).length === 0) {
                throw Error("Body can not be empty");
            }
            result = await Task.find({
                _id: id
            });
            console.log(result);
            if (result.length === 0) {
                throw Error("No task found for this id");
            }
            await Task.findByIdAndUpdate(id, {
                completed: req.completed
            })

            result = await Task.find({
                _id: id
            });
            return {
                result,
                message: "Profile successfully updated."
            }

        } catch (err) {
            return {
                error: err.message
            };
        }
    }

}