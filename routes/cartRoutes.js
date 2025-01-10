const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// Route to add a book to the cart
router.post("/add", cartController.addToCart);

// Route to remove a book from the cart
router.delete("/remove", cartController.removeFromCart);

// Route to get the cart for a specific user
router.get("/:userId", cartController.getCartByUserId);

// Route to clear the cart for a specific user
router.delete("/clear/:userId", cartController.clearCart);

// Route to simulate checkout
router.post("/checkout/:userId", cartController.checkout);

// Route to get cart history (completed or failed transactions)
router.get("/history/:userId", cartController.getCartHistory);

// Route to get books for a given cart ID
router.get("/books/:cartId", cartController.getBooksByCartId);

// Route to get purchased books
router.get("/purchased-books/:userId", cartController.getBooksPurchased);


module.exports = router;
