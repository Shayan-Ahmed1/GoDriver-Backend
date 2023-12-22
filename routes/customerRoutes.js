const express = require("express");
const {
  getCustomers,
  getCustomer,
  createCustomer,
  deleteCustomer,
  updateCustomer,
} = require("../controllers/customerController");
const router = express.Router();

// Retreive all Customers record
router.get("/", getCustomers);

// Retreive a single Customer record
router.get("/:id", getCustomer);

// Create a new Customer record
router.post("/", createCustomer);

// DELETE an existing Customer record
router.delete("/:id", deleteCustomer);

// Update an existing Customer record
router.patch("/:id", updateCustomer);

module.exports = router;
