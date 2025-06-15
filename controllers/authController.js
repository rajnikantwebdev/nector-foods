const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 5;

const registerUser = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // const user = new User({ username, password: hashedPassword, role });

        // const response = await user.save();
        res.status(200).json({ message: "User registered successfully, redirecting to Login Page!" });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Login successful, redirecting to dashboard",
            token,
            user: {
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Unable to login, try again later", error: error?.message });
    }
};

module.exports = { registerUser, loginUser };