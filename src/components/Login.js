import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          username,
          password,
        }
      );

      const { token, userId } = response.data;

      // Store token and age in localStorage
      localStorage.setItem("token", token);
      // localStorage.setItem("age", age);
      localStorage.setItem("userId", userId); // Store token in localStorage for future use

      // Redirect based on age
      navigate("/subjects/math");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.error || "Login failed.");
    }
  };

  const handleBack = () => {
    navigate("/"); // Redirect to the home page
  };

  return (
    <div className="login">
      <a className="back-link" onClick={handleBack}>
        ← Back to Home
      </a>
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
        <button type="submit" className="login-button">
          Login
        </button>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
