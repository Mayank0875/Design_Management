const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes (JWT verification)
const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization; 

    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1]; //Extract Token

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user from DB and attach to request
      req.user = await User.findById(decoded.id).select("-password");

      next(); 
    } else {
      res.status(401).json({ message: "Not authorized, no token" }); 
    }
  } catch (error) {
    res.status(401).json({ message: "Token failed", error: error.message });
  }
};

// ✅ Middleware for Admin-only access
const adminOnly = (req, res, next) => {
  // Check if user exists and has role "admin"
  if (req.user && req.user.role === "admin") { 
    next(); // allow access
  } else {
    res.status(403).json({ message: "Access denied, admin only" });
  }
};

module.exports = { protect, adminOnly };