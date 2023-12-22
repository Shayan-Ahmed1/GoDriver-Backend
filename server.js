require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const carRoutes = require("./routes/carRoutes");
const driverRoutes = require("./routes/driverRoutes");
const customerRoutes = require("./routes/customerRoutes");

PORT = process.env.PORT;

// express app
const app = express();

// Middleware
app.use(express.json());

//Routes
app.use("/api/cars", carRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/customers", customerRoutes);

// Connection to Mongo DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(PORT, () => {
      console.log(
        `DB Connection Established & Server running on http://localhost:${PORT}`
      );
      console.log("Dev Branch");
    });
  })
  .catch((error) => {
    console.log(error);
  });
