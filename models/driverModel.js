const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const driverSchema = new Schema(
  {
    dealer_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Dealer",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone_no: {
      type: Number,
      required: true,
    },
    license_no: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Driver", driverSchema);
