const express = require("express");
const productController = require("../controller/ProductController");
const Oauth = require("../middleware/Owner/Oauth");
const router = new express.Router();

router
    .route("/product")
    .post(
        Oauth,
        productController.add
    ),

router
    .route("/editproduct/:id")
    .put(
        Oauth,
        productController.edit
    )

router
    .route("/allproducts")
    .get(
        Oauth,
        productController.getAll
    )

router
    .route("/deleteproduct/:id")
    .delete(
        Oauth,
        productController.delete
    )

router
    .route("/getproduct/:id")
    .get(
        Oauth,
        productController.get
    )

module.exports = router;