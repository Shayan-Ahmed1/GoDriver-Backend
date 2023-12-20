require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const carRoutes = require("./routes/cars");
const driverRoutes = require("./routes/drivers");
const userRoutes = require("./routes/users");

PORT = process.env.PORT;

// express app
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//Routes
app.use("/api/cars", carRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/users", userRoutes);

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
