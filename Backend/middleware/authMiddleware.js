import jwt from "jsonwebtoken";

export const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization;

  console.log("🔐 Token Received:", token);

  if (!token) {
    console.log("❌ No Token Provided");
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token Verified. Admin ID:", decoded.id);
    req.adminId = decoded.id;
    next();
  } catch (err) {
    console.log("❌ Invalid Token");
    return res.status(401).json({ message: "Invalid token" });
  }
};

