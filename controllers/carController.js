const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Car = require("../models/carModel");

//@desc Retrieve all cars
//@route GET /api/cars
//@access private
const getCars = asyncHandler(async (req, res) => {
  const cars = await Car.find({ dealer_id: req.dealer.id }).sort({
    createdAt: -1,
  });
  res.status(200).json(cars);
});

//@desc Create a new Car
//@route POST /api/cars
//access private
const createCar = asyncHandler(async (req, res) => {
  const {
    make,
    model,
    year,
    registration_number,
    rental_price_per_day,
    rental_status,
  } = req.body;

  if (
    !make ||
    !model ||
    !year ||
    !registration_number ||
    !rental_price_per_day ||
    !rental_status
  ) {
    res.status(404);
    throw new Error("All fields are required!");
  }

  if (rental_price_per_day <= 0 || !rental_price_per_day === "number") {
    return res.status(400).json({ error: "Rent must be a positive number" });
  }

  try {
    const car = await Car.create({
      make,
      model,
      year,
      registration_number,
      rental_price_per_day,
      rental_status,
      dealer_id: req.dealer.id,
    });
    res.status(200).json(car);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//@desc Retrieve a single car
//@route GET /api/cars/:id
//@access private
const getCar = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such car" });
  }

  const car = await Car.findById(id);

  if (!car) {
    res.status(404);
    throw new Error("Car not found");
  }

  res.status(200).json(car);
});

//@desc Update an existing car
//@route PUT /api/cars/:id
//@access private
const updateCar = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such car" });
  }

  const car = await Car.findById(id);

  if (!car) {
    res.status(404);
    throw new Error("Car not found");
  }

  if (car.dealer_id.toString() !== req.dealer.id) {
    req.status(403);
    throw new Error("Dealer don't have permission to update other dealer cars");
  }

  const updatedCar = await Car.findByIdAndUpdate(
    id,
    { ...req.body },
    { returnDocument: "after" }
  );

  res.status(200).json(updatedCar);
});

//@desc Delete an existing car
//@route DELETE /api/cars/:id
//@access private
const deleteCar = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such car" });
  }

  const car = await Car.findByIdAndDelete(id, { returnDocument: "after" });

  if (!car) {
    res.status(404);
    throw new Error("Car not found");
  }

  res.status(200).json(car);
});

module.exports = {
  getCars,
  getCar,
  createCar,
  deleteCar,
  updateCar,
};
