const Cart = require("../models/Cart");

// Add a book to the cart
exports.addToCart = (req, res) => {
  const { userId, bookId, quantity } = req.body;
  Cart.addToCart(userId, bookId, quantity, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Book added to cart successfully", result });
  });
};

// Get the cart for a specific user
exports.getCartByUserId = (req, res) => {
  const userId = req.params.userId;
  Cart.getCartByUserId(userId, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// Remove a book from the cart
exports.removeFromCart = (req, res) => {
  const { userId, bookId } = req.body;
  Cart.removeFromCart(userId, bookId, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Book removed from cart successfully" });
  });
};

// Clear the cart for a user
exports.clearCart = (req, res) => {
  const userId = req.params.userId;
  Cart.clearCart(userId, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Cart cleared successfully" });
  });
};

// Simulate checkout and update cart status
exports.checkout = (req, res) => {
  const userId = req.params.userId;
  const { status } = req.body; // 'completed' or 'payment_failed'
  
  if (!['completed', 'payment_failed'].includes(status)) {
    return res.status(400).json({ error: "Invalid status provided" });
  }

  Cart.updateCartStatus(userId, status, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: `Checkout ${status}.`, result });
  });
};

// Get cart history
exports.getCartHistory = (req, res) => {
  const userId = req.params.userId;
  Cart.getCartHistory(userId, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// Get books for a given cart ID
exports.getBooksByCartId = (req, res) => {
  const cartId = req.params.cartId;
  Cart.getBooksByCartId(cartId, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "No books found for the given cart ID." });
    res.status(200).json(results);
  });
};

// Get books purchased for specific user
exports.getBooksPurchased = (req, res) => {
  const userId = req.params.userId;
  Cart.getBooksPurchased(userId, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};
