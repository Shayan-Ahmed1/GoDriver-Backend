const Dealer = require("../models/dealerModel");
const mongoose = require("mongoose");

// Retreive all Dealers record
const getDealers = async (req, res) => {
  const dealers = await Dealer.find({}).sort({ createdAt: -1 });

  res.status(200).json(dealers);
};

// Register Dealer
const registerDealer = async (req, res) => {
  const { name, email, password, phone_no } = req.body;

  try {
    const dealers = await Dealer.create({
      name,
      email,
      password,
      phone_no,
    });
    res.status(200).json(dealers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// login Dealer
const loginDealer = async (req, res) => {
  const { email, password } = req.body;

  try {
    const dealers = await Dealer.create({
      email,
      password,
    });
    res.status(200).json(dealers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Current Dealer Status
const currentDealer = async (req, res) => {
  const dealers = await Dealer.find({}).sort({ createdAt: -1 });

  res.status(200).json(dealers);
};

module.exports = {
  getDealers,
  registerDealer,
  loginDealer,
  currentDealer,
};
