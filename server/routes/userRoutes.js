const express = require("express");
const router = express.Router();
const User = require("../models/registered");

// GET all patients (admin only)
router.get("/", async (req, res) => {
  try {
    // Fetch users with userType "patient" and exclude the password field
    const users = await User.find({ userType: "patient" }, { password: 0 });

    // Return the list of users
    res.json({ success: true, users });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ success: false, message: "Error fetching users." });
  }
});

// GET specific user by ID (admin or specific user)
router.get("/:id", async (req, res) => {
  try {
    // Fetch the user by ID and exclude the password field
    const user = await User.findById(req.params.id, { password: 0 });

    // If no user found, return 404
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Return the user data
    res.json({ success: true, user });
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


module.exports = router;
