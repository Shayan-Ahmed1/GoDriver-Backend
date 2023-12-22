const express = require("express");
const {
  getDealers,
  registerDealer,
  loginDealer,
  currentDealer,
} = require("../controllers/dealerController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

// Retreive all Dealers record
router.route("/").get(getDealers);

// Register a Dealer
router.route("/register").post(registerDealer);

// Login a Dealer
router.route("/login").post(loginDealer);

//Current Dealer Status
router.route("/current").get(validateToken, currentDealer);

module.exports = router;
