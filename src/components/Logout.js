import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Logout.css";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Logging out...");
    localStorage.removeItem("token");
    console.log("Token after removal:", localStorage.getItem("token")); // Should be null
    navigate("/");
  }, [navigate]);

  return (
    <div className="logout">
      <h2>You have been logged out</h2>
      <p>Thank you for using the Online Library Management System.</p>
      <p>Redirecting to home...</p>
    </div>
  );
};

export default Logout;
