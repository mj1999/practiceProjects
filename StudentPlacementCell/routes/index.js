const express = require("express");
const router = express.Router();
const homeController = require("../controller/homeController");

router.get("/", homeController.home);
router.get("/download", homeController.downloadCSV);
router.use("/auth", require("./auth"));
router.use("/user", require("./user"));
router.use("/students", require("./students"));
router.use("/interviews", require("./interviews"));

module.exports = router;
