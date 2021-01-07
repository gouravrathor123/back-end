const express = require("express");
const productController = require("../controller/ProductController");
const Oauth = require("../middleware/Owner/Oauth");
const router = new express.Router();

router
    .route("/product")
    .post(
        Oauth,
        productController.add
    )

module.exports = router;