const express = require("express");
const { testingController } = require("../controllers/testControllers");
//routes object
const router = express.Router();

//Routes
//router.get responed to HTTP GET
router.get("/", testingController);

//export
module.exports = router;
