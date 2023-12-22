const Driver = require("../models/driverModel");
const mongoose = require("mongoose");

// Retreive all drivers record
const getDrivers = async (req, res) => {
  const drivers = await Driver.find({}).sort({ createdAt: -1 });

  res.status(200).json(drivers);
};

// Retreive a single driver record
const getDriver = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such driver" });
  }

  const driver = await Driver.findById(id);

  if (!driver) {
    res.status(404).json({ error: "No such driver" });
  }

  res.status(200).json(driver);
};

// Create a new driver record
const createDriver = async (req, res) => {
  const { name, email, phone_no, license_no, age, address, transmission } =
    req.body;

  try {
    const driver = await Driver.create({
      name,
      email,
      phone_no,
      license_no,
      age,
      address,
      transmission,
    });
    res.status(200).json(driver);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE an existing driver record
const deleteDriver = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such driver" });
  }

  const driver = await Driver.findOneAndDelete({ _id: id });

  if (!driver) {
    res.status(404).json({ error: "No such driver" });
  }

  res.status(200).json(driver);
};

// Update an existing car record
const updateDriver = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such driver" });
  }

  const driver = await Driver.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!driver) {
    res.status(404).json({ error: "No such driver" });
  }

  res.status(200).json(driver);
};

module.exports = {
  getDrivers,
  getDriver,
  createDriver,
  deleteDriver,
  updateDriver,
};
