import redis from "../config/redis.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export async function authenticaUser(req, res, next) {
    const token = req.cookies.accessToken || req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "No token provided. Please sign in." });
    }

    const isBlacklisted = await redis.get(token);

    if (isBlacklisted) {
        res.clearCookie("accessToken");
        res.clearCookie("token");
        res.clearCookie("refreshToken");
        return res.status(401).json({ message: "Session expired or logged out. Please sign in again." });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded;
        req.user._id = decoded.id;
        console.log('REQ USER:', req.user);
        return next();
    } catch (error) {
        res.clearCookie("accessToken");
        res.clearCookie("token");
        res.clearCookie("refreshToken");
        return res.status(401).json({ message: "Invalid or expired token. Please sign in." });
    }
}
