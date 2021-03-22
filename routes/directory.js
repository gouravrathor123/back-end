const express = require("express");
const Oauth = require('../middleware/Owner/Oauth');
const directoryController = require("../controller/DirectoryController");
const router = new express.Router();

router
    .route("/directory")
    .post(
        Oauth,
        directoryController.add
    );

router
    .route("/updatedirectory/:id")
    .put(
        directoryController.edit
    );

router
    .route("/deletedirectory/:id")
    .delete(
        directoryController.delete
    );

router
    .route("/directorylist/:id") //list of all todos of a perticular user
    .get(
        directoryController.list
    );


module.exports = router;