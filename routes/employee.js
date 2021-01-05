const express = require('express');
const Employee = require('../models/Employee');
const employeeController = require("../controller/EmployeeController");
const router = new express.Router();

router
    .route("/employee")
    .post(
        employeeController.add
    );

router
    .route("/employee/update/:id")
    .put(
        employeeController.edit
    );

router
    .route("/employee/delete/:id")
    .delete(
        employeeController.delete
    );

router
    .route("/employee/:id")
    .get(
        employeeController.get
    );

router
    .route("/employeelist")
    .get(
        employeeController.list
    );

router
    .route("/employee/login")
    .post(
        employeeController.login
    );

router
    .route("/employee/forget")
    .post(
        employeeController.forgetPassword
    );

router
    .route("/employee/reset")
    .post(
        employeeController.resetPassword
    );

router
    .route("/employee/register")
    .post(
        employeeController.register
    );

router
    .route("/owner/verify")
    .post(
        employeeController.verify
    );


router
    .route("/employee/getTasks/:id")
    .get(
        employeeController.getTasks
    );

router
    .route("/employee/editTask/:id")
    .put(
        employeeController.editTask
    );


module.exports = router;