// Books Controller
const Book = require("../models/Book"); // Import Book model to interact with the database
const multer = require("multer"); // Import multer for handling file uploads
const path = require("path"); // Import path module to work with file paths

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the upload directory
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Use timestamp to avoid filename conflicts
  },
});

// Create an instance of multer with the specified storage configuration
const upload = multer({ storage });

// Endpoint to get all books
exports.getBooks = (req, res) => {
  Book.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to retrieve books.", er: err}); // Send error response if retrieval fails
    }
    res.json(results); // Send the retrieved books as JSON response
  });
};

// Endpoint to get books by subject
exports.getBooksBySubject = (req, res, subject) => {
  Book.getBySubject(subject, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to retrieve books." , er: err}); // Send error response if retrieval fails
    }
    res.json(results); // Send the retrieved books by category as JSON response
  });
};

exports.getBooksById = (req, res, bookId) => {
  Book.getById(bookId, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to retrieve books." , er: err}); // Send error response if retrieval fails
    }
    res.json(results); // Send the retrieved books by category as JSON response
  });
};

// Endpoint to add a new book
exports.addBook = (req, res) => {
  const { title, author, subject, price, publicationYear } = req.body; // Destructure request body

  // Check if a PDF file was uploaded
  if (!req.file) {
    return res.status(400).json({ error: "Please upload a PDF file." }); // Bad request if no file is uploaded
  }

  // Store only the filename
  const pdfFilename = path.basename(req.file.path); // Get only the filename from the uploaded file path

  const newBook = {
    title,
    author,
    subject,
    price,
    publicationYear,
    pdfPath: pdfFilename, // Store only the filename of the uploaded PDF
  };

  // Add the new book to the database
  Book.add(newBook, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to add book.", er: err}); // Send error response if addition fails
    }
    // Send success response with the new book's ID
    res
      .status(201)
      .json({ message: "Book added successfully!", bookId: result.insertId });
  });
};

// Use the upload middleware in your routes
exports.uploadBook = upload.single("pdf"); // 'pdf' is the key in form-data used for the uploaded file
