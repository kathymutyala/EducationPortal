// Import the mysql2 library to handle MySQL database connections
const mysql = require("mysql2");
// Load environment variables from a .env file into process.env
require("dotenv").config();

// Create a MySQL database connection using parameters from environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST, // Database host, typically 'localhost' or an IP address
  user: process.env.DB_USER, // Database user name
  password: process.env.DB_PASSWORD, // Database user's password
  database: process.env.DB_NAME, // Name of the database to connect to
});

// Establish a connection to the database
db.connect((err) => {
  if (err) {
    // If an error occurs during connection, log the error message and exit the process
    console.error("Database connection failed:", err.message);
    process.exit(1); // Exit the application with a failure code
  }
  // If the connection is successful, log a success message
  console.log("Connected to MySQL Database.");
});

// Export the database connection for use in other modules
module.exports = db;
