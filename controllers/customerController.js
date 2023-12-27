const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Customer = require("../models/customerModel");

// Retreive all Customers
const getCustomers = async (req, res) => {
  const customers = await Customer.find({}).sort({ createdAt: -1 });
  res.status(200).json(customers);
};

//@desc Register a Customer
//@route POST api/customers/register
//@access public
const registerCustomer = asyncHandler(async (req, res) => {
  const { name, email, password, phone_no } = req.body;

  if (!name || !email || !password || !phone_no) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const customerAvailabe = await Customer.findOne({ email });

  if (customerAvailabe) {
    res.status(400);
    throw new Error("Customer already registered!");
  }

  // Hash Password
  const hashPassword = await bcrypt.hash(password, 10);

  const customer = await Customer.create({
    name,
    email,
    password: hashPassword,
    phone_no,
  });

  if (customer) {
    res
      .status(201)
      .json({ _id: customer.id, name: customer.name, email: customer.email });
  } else {
    res.status(400);
    throw new Error("Customer data is not valid");
  }

  res.json({ message: "Customer Registered" });
});

//@desc login Customer
//@route POST api/customers/login
//@access public
const loginCustomer = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const customer = await Customer.findOne({ email });

  // Compare password and hashPassword
  if (customer && bcrypt.compare(password, customer.password)) {
    const accessToken = jwt.sign(
      {
        customer: {
          email: customer.email,
          id: customer.id,
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

//@desc Current Customer Indo
//@route GET api/customers/register
//@access public
const currentCustomer = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = {
  getCustomers,
  registerCustomer,
  loginCustomer,
  currentCustomer,
};
