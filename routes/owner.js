const express = require('express');
const Owner = require('../models/Owner');
const ownerController = require('../controller/OwnerController')
const router = new express.Router();

router
    .route("/owner")
    .post(
        ownerController.add
    )

module.exports = router;