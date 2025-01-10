// Import the express module to create an Express application
const express = require("express");

// Create a new router object from the Express framework
const router = express.Router();

// Import the bookController module which contains functions to handle book-related operations
const bookController = require("../controllers/bookController");

// Import the authMiddleware module for authentication checks (not used in this code snippet)
const authMiddleware = require("../middleware/authMiddleware");

// Import the upload middleware for handling file uploads
const upload = require("../middleware/uploadMiddleware");

// Define a route to get all books
// When a GET request is made to the root ("/"), the getBooks function from bookController is called
router.get("/", bookController.getBooks);

router.get("/by-subject", (req, res) =>
  bookController.getBooksBySubject(req, res, req.query.subject)
);

router.get("/by-id", (req, res) =>
  bookController.getBooksById(req, res, req.query.bookId)
);

// Define a route to get books specifically for kids
// When a GET request is made to "/kids", it calls getBooksByCategory with "kids" as the category
router.get("/kids", (req, res) =>
  bookController.getBooksByCategory(req, res, "kids")
);

// Define a route to get adult books (18+)
// When a GET request is made to "/adult", it calls getBooksByCategory with "adult" as the category
router.get("/adult", (req, res) =>
  bookController.getBooksByCategory(req, res, "adult")
);

// Define a route to add a new book
// When a POST request is made to the root ("/"), the upload middleware handles the file upload
// Then, the addBook function from bookController is called to add the book details to the database
router.post("/addBooks", upload.single("pdf"), bookController.addBook);

// Export the router object so it can be used in other parts of the application
module.exports = router;
