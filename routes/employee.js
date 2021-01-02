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


module.exports = router;