const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Driver = require("../models/driverModel");

//@desc Retrieve all Drivers
//@route GET /api/driver
//@access private
const getDrivers = asyncHandler(async (req, res) => {
  const drivers = await Driver.find({ dealer_id: req.dealer.id }).sort({
    createdAt: -1,
  });

  res.status(200).json(drivers);
});

//@desc Create a new Driver
//@route POST /api/driver
//access private
const createDriver = asyncHandler(async (req, res) => {
  const { name, email, phone_no, license_no, address } = req.body;

  if (!name || !email || !phone_no || !license_no || !address) {
    res.status(400);
    throw new Error("All fields are required!");
  }

  try {
    const driver = await Driver.create({
      name,
      email,
      phone_no,
      license_no,
      age,
      address,
      transmission,
      dealer_id: req.dealer.id,
    });
    res.status(200).json(driver);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//@desc Retrieve a single Driver
//@route GET /api/drivers/:id
//@access private
const getDriver = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such driver" });
  }

  const driver = await Driver.findById(id);

  if (!driver) {
    res.status(404);
    throw new Error("Expense not found");
  }

  res.status(200).json(driver);
});

//@desc Update an existing Driver
//@route PUT /api/drivers/:id
//@access private
const updateDriver = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such driver" });
  }

  const driver = await Driver.findById(id);

  if (!driver) {
    res.status(404);
    throw new Error("Car not found");
  }

  if (driver.dealer_id.toString() !== req.dealer.id) {
    req.status(403);
    throw new Error(
      "Dealer don't have permission to update other dealer drivers"
    );
  }

  const updatedDriver = await Driver.findByIdAndUpdate(
    id,
    { ...req.body },
    { returnDocument: "after" }
  );

  res.status(200).json(updatedDriver);
});

//@desc Delete an existing Driver
//@route DELETE /api/drivers/:id
//@access private
const deleteDriver = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such driver" });
  }

  const driver = await Driver.findByIdAndDelete(id, {
    returnDocument: "after",
  });

  if (!driver) {
    res.status(404);
    throw new Error("Driver not found");
  }

  res.status(200).json(driver);
});

module.exports = {
  getDrivers,
  getDriver,
  createDriver,
  deleteDriver,
  updateDriver,
};
