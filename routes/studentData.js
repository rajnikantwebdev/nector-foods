const express = require("express");
const router = express.Router();
const { getAllStudent } = require("../controllers/studentController");

router.get("/data", getAllStudent);

module.exports = router