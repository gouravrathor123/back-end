const express = require('express');
const Eauth = require("../middleware/Employee/Eauth");
const employeeController = require("../controller/EmployeeController");
const router = new express.Router();

router
    .route("/employee")
    .post(
        employeeController.add
    );

router
    .route("/employee/check")
    .post(
        employeeController.check
    );

router
    .route("/employee/update/")
    .put(
        Eauth,
        employeeController.edit
    );

router
    .route("/employee/delete/")
    .delete(
        Eauth,
        employeeController.delete
    );

router
    .route("/employee/getProfile")
    .get(
        Eauth,
        employeeController.getProfile
    );

router
    .route("/employee/:id")
    .get(
        employeeController.get
    );

router
    .route("/employee/logout")
    .post(
        Eauth,
        employeeController.logout
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
        Eauth,
        employeeController.forgetPassword
    );

router
    .route("/employee/reset")
    .post(
        Eauth,
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
    .route("/employee/getTasks/")
    .get(
        Eauth,
        employeeController.getTasks
    );

router
    .route("/employee/editTask/:id")
    .put(
        employeeController.editTask
    );


module.exports = router;