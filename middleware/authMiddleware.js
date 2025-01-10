//Auth Middleware
const jwt = require("jsonwebtoken");

module.exports = (requiredAge) => (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "No token provided." });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token." });

    // Ensure the user is 18 years or older
    if (decoded.age < requiredAge) {
      return res
        .status(403)
        .json({ error: "Access restricted to users aged 18 or above." });
    }

    req.user = decoded;
    next();
  });
};
