const db = require("../config/db"); // Import the database connection configuration

class Book {
  // Static method to retrieve all books from the database
  static getAll(callback) {
    const query = "SELECT * FROM books"; // SQL query to select all books
    db.query(query, callback); // Execute the query and pass the result to the callback
  }

  // Static method to retrieve books by category from the database
  static getBySubject(subject, callback) {
    const query = "SELECT * FROM books WHERE subject = ?"; // SQL query to select books by category
    db.query(query, [subject], callback); // Execute the query with the category parameter and pass the result to the callback
  }

  // Static method to retrieve books by category from the database
  static getById(bookId, callback) {
    const query = "SELECT * FROM books WHERE id = ?"; // SQL query to select books by category
    db.query(query, [bookId], callback); // Execute the query with the category parameter and pass the result to the callback
  }
  
  // Static method to add a new book to the database
  static add(book, callback) {
    const query =
      "INSERT INTO books (title, author, subject, price, publicationYear, pdf_path) VALUES (?, ?, ?, ?, ?, ?)"; // SQL query to insert a new book
    const params = [
      book.title, // Book title
      book.author, // Book author
      book.subject,
      book.price,      
      book.publicationYear, // Book publication year
      book.pdfPath, // Path to the uploaded PDF file
    ];
    db.query(query, params, callback); // Execute the insert query with the parameters and pass the result to the callback
  }
}

module.exports = Book; // Export the Book class for use in other parts of the application
