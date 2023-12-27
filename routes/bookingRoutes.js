const express = require("express");
const {
  getBookings,
  getBooking,
  createBooking,
  deleteBooking,
  updateBooking,
} = require("../controllers/bookingController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.use(validateToken);

// Retreive all Bookings record
router.route("/").get(getBookings);

// Create a new Booking record
router.route("/").post(createBooking);

// Retreive a single Booking record
router.route("/:id").get(getBooking);

// Update an existing Booking record
router.route("/:id").put(updateBooking);

// DELETE an existing Booking record
router.route("/:id").delete(deleteBooking);

module.exports = router;
