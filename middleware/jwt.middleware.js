import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

/**
 * Express middleware to verify a JWT sent in the Authorization header.
 * If valid, attaches the decoded payload to req.user and calls next().
 * Otherwise, responds 401 Unauthorized.
 *
 * Expects header: Authorization: Bearer <token>
 */
export async function verifyJwt(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ error: "No authorization header provided." });
    }

    const [scheme, token] = authHeader.split(" ");
    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({ error: "Malformed authorization header." });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(payload.id).select("-password").lean();
    if (!user) {
      return res.status(401).json({ error: "User not found." });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return res.status(401).json({ error: "Invalid or expired token." });
  }
}
