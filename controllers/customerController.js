const User = require("../models/customerModel");
const mongoose = require("mongoose");

// Retreive all users record
const getUsers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });

  res.status(200).json(users);
};

// Retreive a single user record
const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such user" });
  }

  const user = await User.findById(id);

  if (!user) {
    res.status(404).json({ error: "No such user" });
  }

  res.status(200).json(user);
};

// Create a new user record
const createUser = async (req, res) => {
  const { name, email, password, phone_no, address } = req.body;

  try {
    const user = await User.create({
      name,
      email,
      password,
      phone_no,
      address,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE an existing user record
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such user" });
  }

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    res.status(404).json({ error: "No such user" });
  }

  res.status(200).json(user);
};

// Update an existing user record
const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such user" });
  }

  const user = await User.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!user) {
    res.status(404).json({ error: "No such user" });
  }

  res.status(200).json(user);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
