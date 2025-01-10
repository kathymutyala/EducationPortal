import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Header.css"; // Import the CSS file for the header

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false); // Track login status
  const [cartCount, setCartCount] = useState(0); // Track the number of items in the cart
  const navigate = useNavigate(); // For navigation
  const location = useLocation(); // To listen for route changes

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token); // Set login status based on token

    if (token) {
      const userId = localStorage.getItem("userId"); // Retrieve user ID from localStorage
      if (userId) {
        fetchCartCount(userId); // Fetch cart count if user is logged in
      }
    }
  }, [location]); // Re-run when location changes

  const fetchCartCount = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/cart/${userId}`
      );
      setCartCount(response.data.length); // Update cart count
    } catch (error) {
      console.error("Failed to fetch cart count:", error);
      setCartCount(0); // Reset cart count on error
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token on logout
    localStorage.removeItem("userId"); // Clear user ID
    setLoggedIn(false); // Update login status
    setCartCount(0); // Reset cart count
    navigate("/logout"); // Redirect to logout page
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>Education Portal</h1>
      </div>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>

          {loggedIn ? (
            // If user is logged in
            <>
              {/* Learning Material Dropdown */}
              <li className="dropdown">
                <span
                  className="dropdown-title"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Learning Material
                </span>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/subjects/english">English</Link>
                  </li>
                  <li>
                    <Link to="/subjects/mathematics">Mathematics</Link>
                  </li>
                  <li>
                    <Link to="/subjects/english-read-speak">
                      English Reading and Speaking{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to="/subjects/english-grammer">English Grammer</Link>
                  </li>
                  <li>
                    <Link to="/subjects/exam">Exam Focus</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/cart">Cart ({cartCount})</Link>
              </li>
              <li>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            // If user is not logged in
            <>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
