import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/SubjectBooksPage.css";
import { useParams } from "react-router-dom";

const SubjectBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [cartItems, setCartItems] = useState([]); // Track items in the cart
  const { subject } = useParams();

  // Fetch books categorized by the given subject
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/books/by-subject?subject=" + subject
        );
        console.log("Fetched books:", response.data);
        setBooks(response.data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };

    fetchBooks();
  }, [subject]);

  // Fetch cart items for the current user
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userId = localStorage.getItem("userId"); // Replace with dynamic user ID from authentication context
        const response = await axios.get(
          `http://localhost:3000/api/cart/${userId}`
        );
        console.log("Fetched cart items:", response.data);
        setCartItems(response.data.map((item) => item.book_id));
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  // Add book to cart
  const handleAddToCart = async (bookId) => {
    try {
      const userId = localStorage.getItem("userId"); // Replace with dynamic user ID from authentication context
      const response = await axios.post("http://localhost:3000/api/cart/add", {
        userId,
        bookId,
        quantity: 1,
      });
      console.log("Book added to cart:", response.data);
      setCartItems((prev) => [...prev, bookId]); // Add the book ID to the cart items list
      window.location.reload();
    } catch (error) {
      console.error("Failed to add book to cart:", error);
    }
  };

  // Remove book from cart
  const handleRemoveFromCart = async (bookId) => {
    try {
      const userId = localStorage.getItem("userId"); // Replace with dynamic user ID from authentication context
      const response = await axios.delete(
        "http://localhost:3000/api/cart/remove",
        {
          data: {
            userId,
            bookId,
          },
        }
      );
      console.log("Book removed from cart:", response.data);
      setCartItems((prev) => prev.filter((id) => id !== bookId)); // Remove the book ID from the cart items list
      window.location.reload();
    } catch (error) {
      console.error("Failed to remove book from cart:", error);
    }
  };

  return (
    <div class="main">
      <h2>{subject} books</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Publication Year: {book.publicationYear}</p>
            <p>Price: ${book.price}</p>
            {book.pdf_path ? (
              cartItems.includes(book.id) ? (
                <button
                  onClick={() => handleRemoveFromCart(book.id)}
                  className="remove-from-cart-button"
                >
                  Remove from Cart
                </button>
              ) : (
                <button
                  onClick={() => handleAddToCart(book.id)}
                  className="add-to-cart-button"
                >
                  Add to Cart
                </button>
              )
            ) : (
              <p>PDF not available</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubjectBooksPage;
