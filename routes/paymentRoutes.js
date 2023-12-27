// paymentRoute.js
const express = require("express");
const router = express.Router();
const createPaymentIntent = require("../controllers/paymentController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);

// For example, you might have a route for creating a PaymentIntent
router.route("/intent").get(createPaymentIntent);

module.exports = router;
