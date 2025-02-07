const User = require("../models/db").User;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// User Signup
const signupUser = async (req, res) => {
    try {
        const { First_Name, Last_Name, Username, Email, Password, DOB, Role } = req.body;

        // Check if user already exists
        let user = await User.findOne({ Email });
        if (user) return res.status(400).json({ message: "User already exists" });

        // Create new user
        user = new User({ First_Name, Last_Name, Username, Email, Password, DOB, Role });
        await user.save();

        // Generate JWT Token
        const token = jwt.sign({ id: user._id, Role: user.Role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({ token, user: { id: user._id, First_Name, Last_Name, Email, Role } });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// User Login
const loginUser = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        // Check if user exists
        let user = await User.findOne({ Email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        // Compare passwords
        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Generate JWT Token
        const token = jwt.sign({ id: user._id, Role: user.Role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, user: { id: user._id, First_Name: user.First_Name, Email: user.Email, Role: user.Role } });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { signupUser, loginUser };
