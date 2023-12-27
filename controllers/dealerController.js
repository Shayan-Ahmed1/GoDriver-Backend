const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Dealer = require("../models/dealerModel");

// Retreive all Dealers
const getDealers = async (req, res) => {
  const dealers = await Dealer.find({}).sort({ createdAt: -1 });
  res.status(200).json(dealers);
};

//@desc Register a Dealer
//@route POST api/dealers/register
//@access public
const registerDealer = asyncHandler(async (req, res) => {
  const { name, email, password, phone_no } = req.body;

  if (!name || !email || !password || !phone_no) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const dealerAvailabe = await Dealer.findOne({ email });

  if (dealerAvailabe) {
    res.status(400);
    throw new Error("Dealer already registered!");
  }

  // Hash Password
  const hashPassword = await bcrypt.hash(password, 10);

  const dealer = await Dealer.create({
    name,
    email,
    password: hashPassword,
    phone_no,
  });

  if (dealer) {
    res
      .status(201)
      .json({ _id: dealer.id, name: dealer.name, email: dealer.email });
  } else {
    res.status(400);
    throw new Error("Dealer data is not valid");
  }

  res.json({ message: "Dealer Registered" });
});

//@desc login Dealer
//@route POST api/dealers/login
//@access public
const loginDealer = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const dealer = await Dealer.findOne({ email });

  // Compare password and hashPassword
  if (dealer && bcrypt.compare(password, dealer.password)) {
    const accessToken = jwt.sign(
      {
        dealer: {
          email: dealer.email,
          id: dealer.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Credentials are invalid");
  }
});

//@desc Current Dealer Indo
//@route GET api/dealers/register
//@access public
const currentDealer = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = {
  getDealers,
  registerDealer,
  loginDealer,
  currentDealer,
};
