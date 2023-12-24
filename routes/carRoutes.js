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
router.get("/", getCars);

// Retreive a single car record
router.get("/:id", getCar);

// Create a new car record
router.post("/", createCar);

// DELETE an existing car record
router.delete("/:id", deleteCar);

// Update an existing car record
router.patch("/:id", updateCar);

module.exports = router;
