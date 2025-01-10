const multer = require("multer"); // Import multer for handling file uploads
const path = require("path"); // Import path module for handling file and directory paths
const fs = require("fs"); // Import filesystem module to interact with the file system

// Ensure the uploads directory exists or create it
const uploadDir = path.join(__dirname, "../uploads"); // Define the path for the uploads directory
if (!fs.existsSync(uploadDir)) {
  // Check if the uploads directory exists
  fs.mkdirSync(uploadDir, { recursive: true }); // Create the uploads directory if it doesn't exist
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Specify the uploads directory as the destination for files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now(); // Get current timestamp for unique file naming
    const fileExtension = path.extname(file.originalname); // Get the file extension from the original filename
    const originalFileName = path.basename(file.originalname, fileExtension); // Get the original filename without the extension
    // Generate a new filename using timestamp and original filename
    cb(null, `${uniqueSuffix}-${originalFileName}${fileExtension}`); // Call callback with new filename
  },
});

// Validate that only PDF files can be uploaded
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    // Check if the file is a PDF
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only PDF files are allowed!"), false); // Reject the file with an error
  }
};

// Handle file size limits (e.g., max 5MB)
const upload = multer({
  storage: storage, // Use the configured storage
  limits: { fileSize: 5 * 1024 * 1024 }, // Set the maximum file size to 5MB
  fileFilter: fileFilter, // Use the file filter for validating file types
});

module.exports = upload; // Export the configured multer instance for use in other parts of the application
