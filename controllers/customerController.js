const Customer = require("../models/customerModel");
const mongoose = require("mongoose");

// Retreive all Customers record
const getCustomers = async (req, res) => {
  const customers = await Customer.find({}).sort({ createdAt: -1 });

  res.status(200).json(customers);
};

// Retreive a single Customer record
const getCustomer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such Customer" });
  }

  const customers = await Customer.findById(id);

  if (!customers) {
    res.status(404).json({ error: "No such Customer" });
  }

  res.status(200).json(customers);
};

// Create a new Customer record
const createCustomer = async (req, res) => {
  const { name, email, password, phone_no, address } = req.body;

  try {
    const customers = await Customer.create({
      name,
      email,
      password,
      phone_no,
      address,
    });
    res.status(200).json(customers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE an existing Customer record
const deleteCustomer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such Customer" });
  }

  const customers = await Customer.findOneAndDelete({ _id: id });

  if (!customers) {
    res.status(404).json({ error: "No such Customer" });
  }

  res.status(200).json(customers);
};

// Update an existing Customer record
const updateCustomer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such Customer" });
  }

  const customers = await Customer.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!customers) {
    res.status(404).json({ error: "No such Customer" });
  }

  res.status(200).json(customers);
};

module.exports = {
  getCustomers,
  getCustomer,
  createCustomer,
  deleteCustomer,
  updateCustomer,
};
