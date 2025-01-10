// Import the express module to create an Express application
const express = require("express");

// Create a new router object from the Express framework
const router = express.Router();

// Import the authentication controller functions (register, login, logout)
// from the authController module. Ensure the paths and names are correct.
const { register, login, logout } = require("../controllers/authController");

// Define the registration route
// When a POST request is made to /register, the register function from authController is called
router.post("/register", register);

// Define the login route
// When a POST request is made to /login, the login function from authController is called
router.post("/login", login);

// Define the logout route
// When a POST request is made to /logout, the logout function from authController is called
router.post("/logout", logout);

// Export the router object so it can be used in other parts of the application
module.exports = router;
