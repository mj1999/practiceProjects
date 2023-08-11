const express = require("express");
const router = express.Router();
const interviewController = require("../controller/interviewController");

router.post("/add", interviewController.create);
router.post("/allocate-student", interviewController.allocateStudent);

module.exports = router;
