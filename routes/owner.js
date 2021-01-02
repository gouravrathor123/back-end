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

module.exports = router;