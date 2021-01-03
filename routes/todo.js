const express = require("express");
const todoController = require("../controller/TodoController");
const router = new express.Router();

router
    .route("/todo")
    .post(
        todoController.add
    );

module.exports = router;