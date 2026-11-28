import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import redis from "../config/redis.js";

const authTokenResponse = async (user, res, message) => {
  const accessToken = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    config.JWT_SECRET,
    { expiresIn: "1 day" },
  );

  res.cookie("accessToken", accessToken);
  res.cookie("token", accessToken);

  const refreshToken = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    config.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("refreshToken", refreshToken);

  res.status(200).json({
    message,
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

export async function register(req, res) {
  try {
    const { name, email, password, role } = req.body;

    console.log("Received registration data:", { name, email, role });

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = await userModel.create({ name, email, password, role });

    console.log("User created successfully:", user);

    await authTokenResponse(user, res, "User registered successfully");
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    await authTokenResponse(user, res, "Login successful");
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export async function getMe(req, res) {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.set("Cache-Control", "no-store");
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export async function logout(req, res) {
  try {
    const token = req.cookies.accessToken || req.cookies.token;

    res.clearCookie("accessToken", { path: "/" });
    res.clearCookie("token", { path: "/" });
    res.clearCookie("refreshToken", { path: "/" });

    if (!token) {
      return res.status(200).json({ message: "Already logged out" });
    }

    const tokenTtlSeconds = 60 * 60 * 24;
    await redis.set(token, "blacklisted", { EX: tokenTtlSeconds });

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
}

export async function refreshToken(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token is required",
      });
    }

    const decoded = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET || config.JWT_SECRET);

    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      config.JWT_SECRET,
      { expiresIn: "1 day" }
    );

    res.cookie("accessToken", accessToken);
    res.cookie("token", accessToken);

    return res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
      accessToken,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired refresh token",
    });
  }
}
