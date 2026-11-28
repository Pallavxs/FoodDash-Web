import redis from "../config/redis.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export async function authenticaUser(req, res, next) {
    const accessToken = req.cookies.accessToken || req.cookies.token;

    if (!accessToken) {
        return res.status(401).json({ message: "No token provided. Please sign in." });
    }

    try {
        const isBlacklisted = await redis.get(accessToken);

        if (isBlacklisted) {
            res.clearCookie("accessToken", { path: "/" });
            res.clearCookie("token", { path: "/" });
            res.clearCookie("refreshToken", { path: "/" });
            return res.status(401).json({ message: "Session expired. Please sign in again." });
        }

        const decoded = jwt.verify(accessToken, config.JWT_SECRET);
        req.user = decoded;
        req.user._id = decoded.id;
        return next();
    } catch (error) {
        res.clearCookie("accessToken", { path: "/" });
        res.clearCookie("token", { path: "/" });
        res.clearCookie("refreshToken", { path: "/" });
        return res.status(401).json({ message: "Invalid or expired token. Please sign in." });
    }
}
