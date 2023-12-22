const express = require("express");
const {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} = require("../controllers/customerController");
const router = express.Router();

// Retreive all users record
router.get("/", getUsers);

// Retreive a single user record
router.get("/:id", getUser);

// Create a new user record
router.post("/", createUser);

// DELETE an existing user record
router.delete("/:id", deleteUser);

// Update an existing user record
router.patch("/:id", updateUser);

module.exports = router;
