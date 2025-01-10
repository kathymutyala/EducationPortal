const db = require("../config/db"); // Import the database connection configuration

class Cart {
  // Static method to add a book to the cart
  static addToCart(userId, bookId, quantity, callback) {
    const query = `
      INSERT INTO cart (user_id, book_id, quantity, status)
      VALUES (?, ?, ?, 'initiated')
      ON DUPLICATE KEY UPDATE quantity = quantity + ?`;
    db.query(query, [userId, bookId, quantity, quantity], callback);
  }

  // Static method to retrieve the cart for a specific user with active status
  static getCartByUserId(userId, callback) {
    const query = `
      SELECT c.id, c.user_id, c.book_id, c.quantity, c.status, b.title, b.author, b.price
      FROM cart c
      JOIN books b ON c.book_id = b.id
      WHERE c.user_id = ? AND c.status = 'initiated'`;
    db.query(query, [userId], callback);
  }

   // Static method to retrieve the cart for a specific user with active status
   static getBooksPurchased(userId, callback) {
    const query = `
      SELECT 
        b.id AS book_id, 
        b.title, 
        b.author, 
        b.price, 
        b.pdf_path,
        SUM(c.quantity) AS total_quantity
      FROM cart c
      JOIN books b ON c.book_id = b.id
      WHERE c.user_id = ? AND c.status = 'completed'
      GROUP BY b.id, b.title, b.author, b.price, b.pdf_path`;
    db.query(query, [userId], callback);
  }  

  // Static method to remove a book from the cart
  static removeFromCart(userId, bookId, callback) {
    const query = `DELETE FROM cart WHERE user_id = ? AND book_id = ? AND status = 'initiated'`;
    db.query(query, [userId, bookId], callback);
  }

  // Static method to clear all items from a user's cart
  static clearCart(userId, callback) {
    const query = `DELETE FROM cart WHERE user_id = ? AND status = 'initiated'`;
    db.query(query, [userId], callback);
  }

  // Static method to update the status of the cart during checkout
  static updateCartStatus(userId, status, callback) {
    const query = `
      UPDATE cart 
      SET status = ? 
      WHERE user_id = ? AND status = 'initiated'`;
    db.query(query, [status, userId], callback);
  }

  // Static method to retrieve completed or failed transactions
  static getCartHistory(userId, callback) {
    const query = `
      SELECT c.id, c.user_id, c.book_id, c.quantity, c.status, c.added_at, b.title, b.author, b.price
      FROM cart c
      JOIN books b ON c.book_id = b.id
      WHERE c.user_id = ? AND c.status IN ('completed', 'payment_failed')`;
    db.query(query, [userId], callback);
  }

// Static method to get books for a given cart ID
static getBooksByCartId(cartId, callback) {
  const query = `
    SELECT c.id AS cart_id, c.quantity, c.status, b.id AS book_id, b.title, b.author, b.price
    FROM cart c
    JOIN books b ON c.book_id = b.id
    WHERE c.id = ?`;
  db.query(query, [cartId], callback);
}

}

module.exports = Cart;
