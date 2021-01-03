const express = require("express");
const todoController = require("../controller/TodoController");
const router = new express.Router();

router
    .route("/todo")
    .post(
        todoController.add
    );

router
    .route("/todo/update/:id")
    .put(
        todoController.edit
    );

module.exports = router;