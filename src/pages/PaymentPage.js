import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/PaymentPage.css"; // Create this CSS file for styling

const PaymentPage = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const handlePayment = async (e) => {
    e.preventDefault();

    // Simulate payment process
    if (!cardNumber || !expiryDate || !cvv) {
      alert("Please fill in all payment details.");
      return;
    }

    try {
      await axios.post(`http://localhost:3000/api/cart/checkout/${userId}`, {
        status: "completed"
      });
      alert("Payment successful!");
      navigate("/payment-successful");
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="payment-container">
      <h2>Payment Page</h2>
      <form className="payment-form" onSubmit={handlePayment}>
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number:</label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234 5678 9012 3456"
          />
        </div>
        <div className="form-group">
          <label htmlFor="expiryDate">Expiry Date:</label>
          <input
            type="text"
            id="expiryDate"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/YY"
          />
        </div>
        <div className="form-group">
          <label htmlFor="cvv">CVV:</label>
          <input
            type="password"
            id="cvv"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="123"
          />
        </div>
        <button type="submit" className="pay-button">
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
