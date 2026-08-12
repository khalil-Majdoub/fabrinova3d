import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const requireAuth = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid token" });
  }
  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("_id role");
    if (!user) return res.status(401).json({ message: "Account no longer exists" });
    // Read the role from MongoDB instead of trusting an old token claim.
    req.user = { id: user._id.toString(), role: user.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const requireRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};
