const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const paymentSchema = new Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      type: "String",
      ref: "Customer",
    },
    paymentId: {
      type: "String",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
