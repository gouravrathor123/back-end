const express = require("express");
const catalogController = require("../controller/CatalogController");
const Oauth = require("../middleware/Owner/Oauth");
const router = new express.Router();

router
    .route("/catalog")
    .post(
        Oauth,
        catalogController.add
    )

module.exports = router;