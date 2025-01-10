import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/CartPage.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalValue, setTotalValue] = useState(0); // State for total cart value
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/cart/${userId}`
        );
        const items = response.data;

        setCartItems(items);

        // Calculate the total value of the cart
        const total = items.reduce((sum, item) => sum + Number(item.price), 0);
        setTotalValue(total);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    fetchCartItems();
  }, [userId]);

  const handleCheckout = async () => {
    try {
      // await axios.put(`http://localhost:3000/api/cart/${userId}/checkout`);
      // alert("Checkout completed successfully!");
      navigate("/payment");
    } catch (error) {
      console.error("Failed to checkout:", error);
      alert("Checkout failed. Please try again.");
    }
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item.id}>
                <h3>{item.title}</h3>
                <p>Author: {item.author}</p>
                <p>Price: ${item.price}</p>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h3>Total Value: ${totalValue}</h3>
          </div>
          <button className="checkout-button" onClick={handleCheckout}>
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
