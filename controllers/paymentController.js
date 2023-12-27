// paymentController.js
const stripe = require("stripe")(
  "sk_test_51OQni1GJvwxGHVH3gNcuEonx1qoYmQcRLeswmJG9sALK2laTmfdlVlv6WWhppAcq9xYJwilrKKUwq5GCdeH2E7JW00dVX5cfzo"
); // Replace with your actual Stripe secret key
const Payment = require("../models/paymentModel");

const createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      customer: customerId,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .json({ error: "Amount must be a positive number" });
    }

    // Save payment information to your database
    const payment = new Payment({
      paymentId: paymentIntent.id,
      amount,
      status: paymentIntent.status,
      customerId: req.user.id,
    });

    await payment.save();

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating PaymentIntent:", error);
    res.status(500).json({ error: "Failed to create PaymentIntent" });
  }
};

module.exports = createPaymentIntent;
