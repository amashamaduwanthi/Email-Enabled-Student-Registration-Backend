const express = require("express");
const { registerStudent ,validateStudent} = require("../controllers/studentController");
const router = express.Router();

router.post("/register", validateStudent, registerStudent);
module.exports = router;
