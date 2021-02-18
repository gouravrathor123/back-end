const express = require("express");
const dailyreportController = require("../controller/DailyReportsController");
const Eouth = require("../middleware/Employee/Eauth");
const Oauth = require("../middleware/Owner/Oauth");
const router = new express.Router();

router
    .route("/dailyreport")
    .post(
        Eouth,
        dailyreportController.add,
    )

router
    .route("/editdailyreport/:id")
    .put(
        dailyreportController.edit,
    );

router
    .route("/deletedailyreport/:id")
    .delete(
        dailyreportController.delete,
    );

router
    .route("/listofalldailyreportforuser")
    .get(
        Eouth,
        dailyreportController.getlistforuser
    );

router
    .route("/listofalldailyreportforowner")
    .get(
        Oauth,
        dailyreportController.getlistforowner
    );


module.exports = router;