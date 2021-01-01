const express = require('express');
const Employee = require('../models/Employee');
const employeeController = require("../controller/EmployeeController");
const router = new express.Router();

router
    .route("/employee")
    .post(
        employeeController.add
    )

module.exports = router;