require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const carRoutes = require("./routes/carRoutes");
const driverRoutes = require("./routes/driverRoutes");
const customerRoutes = require("./routes/customerRoutes");
const dealerRoutes = require("./routes/dealerRoutes");
const errorHandler = require("./middleware/errorHandler");

// express app
const app = express();

PORT = process.env.PORT;

// middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/api/cars", carRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/dealers", dealerRoutes);
app.use(errorHandler);

// Connection to Mongo DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(PORT, () => {
      console.log(
        `DB Connection Established & Server running on http://localhost:${PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
