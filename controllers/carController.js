const Car = require("../models/carModel");
const mongoose = require("mongoose");

// Retreive all cars record
const getCars = async (req, res) => {
  const cars = await Car.find({}).sort({ createdAt: -1 });

  res.status(200).json(cars);
};

// Retreive a single car record
const getCar = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such car" });
  }

  const car = await Car.findById(id);

  if (!car) {
    return res.status(404).json({ error: "No such car" });
  }

  res.status(200).json(car);
};

// Create a new car record
const createCar = async (req, res) => {
  const {
    make,
    model,
    year,
    color,
    registration_number,
    rental_price_per_day,
    rental_status,
  } = req.body;

  try {
    const car = await Car.create({
      make,
      model,
      year,
      color,
      registration_number,
      rental_price_per_day,
      rental_status,
    });
    res.status(200).json(car);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE an existing car record
const deleteCar = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such car" });
  }

  const car = await Car.findOneAndDelete({ _id: id });

  if (!car) {
    return res.status(404).json({ error: "No such car" });
  }

  res.status(200).json(car);
};

// Update an existing car record
const updateCar = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such car" });
  }

  const car = await Car.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!car) {
    return res.status(404).json({ error: "No such car" });
  }

  res.status(200).json(car);
};

module.exports = {
  getCars,
  getCar,
  createCar,
  deleteCar,
  updateCar,
};
