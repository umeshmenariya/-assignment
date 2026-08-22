const jwt = require("jsonwebtoken");
const Staff = require("../models/staffModel");

const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey123";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "Authentication token missing" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const staff = await Staff.findById(decoded.id).select("-password");

    if (!staff) {
      return res.status(401).json({ success: false, message: "Staff not found" });
    }

    req.user = staff;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
