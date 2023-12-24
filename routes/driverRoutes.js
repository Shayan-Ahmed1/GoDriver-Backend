const express = require("express");
const {
  getDrivers,
  getDriver,
  createDriver,
  deleteDriver,
  updateDriver,
} = require("../controllers/driverController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.use(validateToken);

// Retreive all drivers record
router.route("/").get(getDrivers);

// Retreive a single driver record
router.route("/:id").get(getDriver);

// Create a new driver record
router.route("/").post(createDriver);

// DELETE an existing driver record
router.route("/:id").delete(deleteDriver);

// Update an existing driver record
router.route("/:id").put(updateDriver);

module.exports = router;
