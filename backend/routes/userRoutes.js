const express = require("express");
const { User } = require("../models/db"); 
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "First_Name Last_Name Email Role");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

module.exports = router;
