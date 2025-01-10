const User = require("../models/User"); // Import User model
const bcrypt = require("bcryptjs"); // Import bcrypt for password hashing
const jwt = require("jsonwebtoken"); // Import jsonwebtoken for creating JWT tokens

require("dotenv").config(); // Ensure environment variables are loaded

// Function to register a new user
exports.register = async (req, res) => {
  const { username, password, studentId } = req.body; // Destructure request body

  // Validate input
  if (!username || !password || !studentId) {
    return res
      .status(400) // Bad request if validation fails
      .json({ message: "Username, password, and student ID are required." });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findByUsername(username); // Query for existing user
    if (existingUser.length > 0) {
      return res.status(409).json({ message: "User already exists." }); // Conflict if user exists
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password with salt rounds

    // Create the new user
    const newUser = await User.create({
      username,
      password: hashedPassword, // Store hashed password
      studentId, // Use student ID from request
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser.insertId }, // Payload includes user ID
      process.env.JWT_SECRET, // Secret for signing the token
      { expiresIn: "1h" } // Token expiration
    );

    console.log("Registration Token:", token); // Log token for debugging

    // Send token and message to frontend
    return res.status(201).json({
      message: "User registered successfully!",
      token, // Return generated token
      userId: newUser.insertId,
    });
  } catch (error) {
    console.error("Registration error:", error); // Log error details
    return res.status(500).json({ message: "Internal server error." }); // Server error response
  }
};

// Function to log in a user
exports.login = async (req, res) => {
  const { username, password } = req.body; // Destructure request body
  try {
    const users = await User.findByUsername(username); // Find user by username
    const user = users.length > 0 ? users[0] : null; // Access the first user

    console.log("Retrieved User:", user); // Log the user object

    if (!user) return res.status(404).json({ error: "User not found." }); // Not found if no user

    const isMatch = await bcrypt.compare(password, user.password); // Compare provided password with stored hash
    if (!isMatch) return res.status(401).json({ error: "Invalid password." }); // Unauthorized if password doesn't match

    // Generate JWT token with user ID
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expiration
    });

    // Send the token and user ID in the response
    res.status(200).json({
      message: "Login successful",
      userId: user.id,
      token, // Return generated token
    });
  } catch (err) {
    console.error("Login error:", err); // Log error details
    res.status(500).json({ error: "Login failed." }); // Server error response
  }
};

// Function to log out a user
exports.logout = (req, res) => {
  res.clearCookie("token"); // If using cookies to store JWT
  res.status(200).json({ message: "Logged out successfully." }); // Send logout confirmation
};
