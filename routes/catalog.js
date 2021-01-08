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

router
    .route("/editcatalog/:id")
    .put(
        Oauth,
        catalogController.edit
    )

router
    .route("/allcatalogs")
    .get(
        Oauth,
        catalogController.getAll
    )

router
    .route("/deletecatalog/:id")
    .delete(
        Oauth,
        catalogController.delete
    )

router
    .route("/getcatalog/:id")
    .get(
        Oauth,
        catalogController.get
    )


module.exports = router;