const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/userControllers");
//console.log("registerController:", registerController);
//router object
const router = express.Router();

//routes
//REGISTER || POST
router.post("/register", registerController);

//Login || POST
router.post("/login", loginController);

module.exports = router;
