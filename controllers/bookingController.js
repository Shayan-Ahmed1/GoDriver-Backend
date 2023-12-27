const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Booking = require("../models/bookingModel");

//@desc Retrieve all Bookings
//@route GET /api/bookings
//@access private
const getBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ customerId: req.user.id }).sort({
    createdAt: -1,
  });
  res.status(200).json(bookings);
});

//@desc Create a new Booking
//@route POST /api/bookings
//access private
const createBooking = asyncHandler(async (req, res) => {
  const { address, startDate, endDate, amount } = req.body;

  if (!address || !startDate || !endDate || !amount) {
    res.status(404);
    throw new Error("All fields are required!");
  }

  if (amount <= 0 || !amount === "number") {
    return res.status(400).json({ error: "Amount must be a positive number" });
  }

  try {
    const booking = await Booking.create({
      address,
      startDate,
      endDate,
      amount,
      customerID: req.user.id,
    });
    console.log(booking);
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//@desc Retrieve a single Booking
//@route GET /api/Bookings/:id
//@access private
const getBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Booking" });
  }

  const booking = await Booking.findById(id);

  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }

  res.status(200).json(booking);
});

//@desc Update an existing Booking
//@route PUT /api/Bookings/:id
//@access private
const updateBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Booking" });
  }

  const booking = await Booking.findById(id);

  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }

  if (booking.customerId.toString() !== req.user.id) {
    req.status(403);
    throw new Error(
      "Customers don't have permission to update other Customer Bookings"
    );
  }

  const updatedBooking = await Booking.findByIdAndUpdate(
    id,
    { ...req.body },
    { returnDocument: "after" }
  );

  res.status(200).json(updatedBooking);
});

//@desc Delete an existing Booking
//@route DELETE /api/bookings/:id
//@access private
const deleteBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Booking" });
  }

  const booking = await Booking.findByIdAndDelete(id, {
    returnDocument: "after",
  });

  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }

  res.status(200).json(booking);
});

module.exports = {
  getBookings,
  getBooking,
  createBooking,
  deleteBooking,
  updateBooking,
};
