const express = require("express");
const {
  getCars,
  getCar,
  createCar,
  deleteCar,
  updateCar,
} = require("../controllers/carController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.use(validateToken);

// Retreive all cars record
router.route("/").get(getCars);

// Create a new car record
router.route("/").post(createCar);

// Retreive a single car record
router.route("/:id").get(getCar);

// Update an existing car record
router.route("/:id").put(updateCar);

// DELETE an existing car record
router.route("/:id").delete(deleteCar);

module.exports = router;
