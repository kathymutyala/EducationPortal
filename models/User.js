const db = require("../config/db"); // Import the database connection configuration

class User {
  // Create a new user
  static create(user) {
    return new Promise((resolve, reject) => {
      const { username, password, studentId } = user; // Extract only necessary fields
      const query =
        "INSERT INTO users (username, password, studentId) VALUES (?, ?, ?)";
      db.query(query, [username, password, studentId], (err, results) => {
        if (err) {
          console.error("Error creating user:", err); // Log the error for debugging
          return reject(err); // Reject the promise with the error
        }
        resolve(results); // Resolve the promise with the results
      });
    });
  }

  // Find user by username
  static findByUsername(username) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE username = ?";
      db.query(query, [username], (err, results) => {
        if (err) {
          console.error("Error finding user:", err); // Log the error for debugging
          return reject(err); // Reject the promise with the error
        }
        resolve(results); // Resolve the promise with the results
      });
    });
  }

  // Find user by ID
  static findById(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE id = ?";
      db.query(query, [id], (err, results) => {
        if (err) {
          return reject(err); // Reject the promise with the error
        }
        resolve(results); // Resolve the promise with the results
      });
    });
  }

  // Update user image
  static updateImage(id, image) {
    return new Promise((resolve, reject) => {
      const query = "UPDATE users SET image = ? WHERE id = ?";
      db.query(query, [image, id], (err, results) => {
        if (err) {
          return reject(err); // Reject the promise with the error
        }
        resolve(results); // Resolve the promise with the results
      });
    });
  }

  // Update user details
  static updateUser(id, userDetails) {
    return new Promise((resolve, reject) => {
      const { username, dob } = userDetails; // Get username and dob for updating
      const query = "UPDATE users SET username = ?, dob = ? WHERE id = ?";
      db.query(query, [username, dob, id], (err, results) => {
        if (err) {
          return reject(err); // Reject the promise with the error
        }
        resolve(results); // Resolve the promise with the results
      });
    });
  }
}

module.exports = User; // Export the User class for use in other parts of the application
