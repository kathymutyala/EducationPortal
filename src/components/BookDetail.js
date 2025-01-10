import React from "react";
import "../styles/BookDetail.css"; // Import the CSS file for book details

//Define BoookDetail functional component that receives book as property.
const BookDetail = ({ book }) => {
  //Function top handle the Read button.
  const handleReadClick = () => {
    // Logic to open the PDF in a new tab
    window.open(book.pdfPath, "_blank");
  };

  return (
    <div className="book-detail">
      {/* Display the book title using the 'title' property from the 'book' object. */}
      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">Author: {book.author}</p>
      <p className="book-category">Category: {book.category}</p>
      <p className="book-publication-year">
        Publication Year: {book.publicationYear}
      </p>
      <p className="book-description">{book.description}</p>
      {book.pdfPath && (
        <button onClick={handleReadClick} className="read-button">
          Read
        </button>
      )}
    </div>
  );
};

export default BookDetail;
