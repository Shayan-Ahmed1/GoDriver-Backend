const express = require("express");
const {
  getCustomers,
  registerCustomer,
  loginCustomer,
  currentCustomer,
} = require("../controllers/CustomerController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

// Retreive all Customers record
router.route("/").get(getCustomers);

// Register a Customer
router.route("/register").post(registerCustomer);

// Login a Customer
router.route("/login").post(loginCustomer);

//Current Customer Status
router.route("/current").get(validateToken, currentCustomer);

module.exports = router;
