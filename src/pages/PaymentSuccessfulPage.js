import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/PaymentSuccessfulPage.css";

const PaymentSuccessfulPage = () => {
  const [purchasedBooks, setPurchasedBooks] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchPurchasedBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/cart/purchased-books/${userId}`);
        setPurchasedBooks(response.data);
      } catch (error) {
        console.error("Failed to fetch purchased books:", error);
      }
    };

    fetchPurchasedBooks();
  }, [userId]);

  return (
    <div className="success-container">
      <h2>Payment Successful!</h2>
      <p>Your order has been completed successfully. Thank you for your purchase!</p>

      <div className="purchased-books">
        <h3>Purchased Books:</h3>
        <ul>
          {purchasedBooks.map((book) => (
            <li key={book.id}>
              <h4>{book.title}</h4>
              <p>Author: {book.author}</p>
              <p>Price: ${book.price}</p>
              {book.pdf_path ? (
                <a
                  href={`http://localhost:3000/uploads/${book.pdf_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="download-button"
                >
                  Download PDF
                </a>
              ) : (
                <p>PDF not available</p>
              )}
            </li>
          ))}
        </ul>
      </div>

      <Link to="/" className="home-button">
        Back to Home
      </Link>
    </div>
  );
};

export default PaymentSuccessfulPage;
