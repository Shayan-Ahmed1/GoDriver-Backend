const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const dealerSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxLength: 20,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      maxLength: 50,
      required: [true, "Email Address is required"],
      unique: true,
      validate: [validator.isEmail, "invalid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
    },
    phone_no: {
      type: Number,
      required: [true, "Phone number is rrequired"],
      trim: true,
      maxLength: 20,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dealer", dealerSchema);
