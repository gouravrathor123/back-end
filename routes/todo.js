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

router
    .route("/todo/:id")
    .get(
        todoController.get
    );

router
    .route("/todo/delete/:id")
    .delete(
        todoController.delete
    );

router
    .route("/todo/list/:id") //list of all todos of a perticular user
    .get(
        todoController.list
    );


module.exports = router;