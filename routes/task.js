const express = require('express');
const taskController = require('../controller/TaskController')
const router = new express.Router();
const Oauth = require("../middleware/Owner/Oauth");

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
        taskController.getCompletedTask
    );

router
    .route("/owner/getIncompletedTask")
    .get(
        Oauth,
        taskController.getIncompletedTask
    );
module.exports = router;