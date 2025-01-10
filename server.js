// Import required packages
const express = require("express"); // Import the Express framework for building web applications
const dotenv = require("dotenv"); // Import dotenv to load environment variables from a .env file
const authRoutes = require("./routes/authRoutes"); // Import authentication routes
const bookRoutes = require("./routes/bookRoutes"); // Import book-related routes
const cartRoutes = require("./routes/cartRoutes"); // Import book-related routes
const db = require("./config/db"); // Import the database configuration (not shown in this snippet)
const cors = require("cors"); // Import CORS middleware to enable cross-origin resource sharing
const path = require("path"); // Import the path module to handle and transform file paths

// Load environment variables from .env file into process.env
dotenv.config();

// Create an instance of an Express application
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Enable CORS for all routes, allowing requests from different origins
app.use(cors());

// Serve static files from the "uploads" directory. This allows users to access uploaded files via URLs.
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Define API routes for authentication
app.use("/api/auth", authRoutes);

// Define API routes for book-related operations
app.use("/api/books", bookRoutes);

app.use("/api/cart", cartRoutes);

// Define the port to listen on, using the PORT variable from environment or defaulting to 3000
const PORT = process.env.PORT || 3000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  // Log a message indicating the server is running
  console.log(`Server is running on http://localhost:${PORT}`);
});
