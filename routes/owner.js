const express = require('express');
const ownerController = require('../controller/OwnerController')
const router = new express.Router();
const Oauth = require("../middleware/Owner/Oauth");

router
    .route("/owner")
    .post(
        ownerController.add
    );

router
    .route("/owner/update/")
    .put(
        Oauth,
        ownerController.edit
    );

router
    .route("/owner/delete/")
    .delete(
        Oauth,
        ownerController.delete
    );

// router
//     .route("/owner/:id")
//     .get(
//         Oauth,
//         ownerController.get
//     );

router
    .route("/owner/getProfile")
    .get(
        Oauth,
        ownerController.getProfile
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
        Oauth,
        ownerController.forgetPassword
    );

router
    .route("/owner/reset")
    .post(
        Oauth,
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
    .route("/owner/logout")
    .post(
        Oauth,
        ownerController.logout
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