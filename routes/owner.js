const express = require('express');
const ownerController = require('../controller/OwnerController')
const router = new express.Router();

router
    .route("/owner")
    .post(
        ownerController.add
    );

router
    .route("/owner/update/:id")
    .put(
        ownerController.edit
    );

router
    .route("/owner/delete/:id")
    .delete(
        ownerController.delete
    );

router
    .route("/owner/:id")
    .get(
        ownerController.get
    );

router
    .route("/ownerlist")
    .get(
        ownerController.list
    );

router
    .route("/owner/login")
    .post(
        ownerController.login
    );

router
    .route("/owner/forget")
    .post(
        ownerController.forgetPassword
    );

router
    .route("/owner/reset")
    .post(
        ownerController.resetPassword
    );

router
    .route("/owner/register")
    .post(
        ownerController.register
    );

router
    .route("/owner/verify")
    .post(
        ownerController.verify
    );

router
    .route("/owner/addTask")
    .post(
        ownerController.addTask
    );

router
    .route("/owner/editTask/:id")
    .put(
        ownerController.editTask
    );

router
    .route("/owner/deleteTask/:id")
    .delete(
        ownerController.deleteTask
    );

router
    .route("/owner/getAllTask/:id")
    .get(
        ownerController.getAllTask
    );



module.exports = router;