const express = require('express');
const taskController = require('../controller/TaskController')
const router = new express.Router();
const Oauth = require("../middleware/Owner/Oauth");
const Eauth = require("../middleware/Employee/Eauth");

router
    .route("/owner/addTask")
    .post(
        Oauth,
        taskController.addTask
    );

router
    .route("/owner/editTask/:id")
    .put(
        taskController.editTask
    );

router
    .route("/owner/deleteTask/:id")
    .delete(
        taskController.deleteTask
    );

router
    .route("/owner/getAllTask/")
    .get(
        Oauth,
        taskController.getAllTask
    );

router
    .route("/owner/getAllEmployee/:id")
    .get(
        Oauth,
        taskController.getAllEmployee
    );

router
    .route("/owner/getTaskById/:id")
    .get(
        taskController.getTaskByID
    );

router
    .route("/owner/getCompletedTask")
    .get(
        Oauth,
        taskController.getOwnerCompletedTask
    );

router
    .route("/employee/getCompleted/Task")
    .get(
        Eauth,
        taskController.getCompletedTask
    );

router
    .route("/owner/getIncompletedTask")
    .get(
        Oauth,
        taskController.getIncompletedTask
    );

router
    .route("/employee/getIncompleted/Task")
    .get(
        Eauth,
        taskController.getIncompletedTask
    );
module.exports = router;