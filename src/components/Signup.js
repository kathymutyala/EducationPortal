import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [dob, setDob] = useState("");
  const [studentId, setStudentId] = useState(""); // Added state for student ID
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); // Clear any existing error messages
    setSuccessMessage("");

    // Basic validation for password length
    // if (password.length < 6) {
    //   setError("Password must be at least 6 characters long.");
    //   return;
    // }

    // Regular expression for password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\W).{8,}$/; // At least one uppercase, one special character, and minimum 8 characters

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters long, include one uppercase letter, one special character and numbers."
      );
      return;
    }

    if (!studentId) {
      setError("Student ID is required.");
      return;
    }

    try {
      const path = "http://localhost:3000/api/auth/register";
      const response = await axios.post(path, {
        username,
        password,
        studentId,
      });

      const { message, token, userId } = response.data; // Extract token and age from response

      console.log("Registration Token:", token); // Log token to the console
      localStorage.setItem("token", token); // Store token in localStorage for future use
      localStorage.setItem("userId", userId); // Store token in localStorage for future use
      // localStorage.setItem("age", age); // Store age for access logic

      setSuccessMessage(message); // Show success message
      navigate("/login"); // Redirect to the login page
    } catch (err) {
      console.error("Signup error:", err);
      if (err.response && err.response.data) {
        setError(
          err.response.data.error || "Registration failed. Please try again."
        );
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  const handleBack = () => {
    navigate("/"); // Redirect to the home page
  };

  return (
    <div className="signup">
      <a className="back-link" onClick={handleBack}>
        ← Back to Home
      </a>
      <h2 className="signup-title">Signup</h2>
      <form className="signup-form" onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="signup-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="signup-input"
        />
        {/* <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
          className="signup-input"
        /> */}
        <input
          type="text"
          placeholder="Student ID" // New input field for student ID
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
          className="signup-input"
        />
        <button type="submit" className="signup-button">
          Signup
        </button>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        {successMessage && (
          <p style={{ color: "green", textAlign: "center" }}>
            {successMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default Signup;
