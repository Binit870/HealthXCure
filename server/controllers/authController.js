import User from "../models/User.js";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Helper to format user response
const formatUserResponse = (req, user) => {
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const userObj = user.toObject ? user.toObject() : user;

  if (userObj.profileImageUrl && !userObj.profileImageUrl.startsWith("http")) {
    userObj.profileImageUrl = `${baseUrl}${userObj.profileImageUrl}`;
  }

  delete userObj.password;
  return userObj;
};

/* -------------------------- GOOGLE LOGIN / SIGNUP -------------------------- */
export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ message: "Google token missing" });
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(401).json({ message: "Invalid Google token" });
    }

    const { name, email, picture, sub } = payload;
    if (!email) {
      return res.status(400).json({ message: "Google account missing email" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      // Create new Google user
      const randomPassword = crypto.randomBytes(16).toString("hex");
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      user = await User.create({
        name,
        username: email.split("@")[0],
        email,
        password: hashedPassword,
        googleId: sub,
        profileImageUrl: picture,
      });
    } else if (!user.googleId) {
      // Link existing manual account with Google
      user.googleId = sub;
      await user.save();
    }

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.status(200).json({
      token: jwtToken,
      user: formatUserResponse(req, user),
    });
  } catch (error) {
    console.error("Google login error:", error);
    return res.status(401).json({ message: "Invalid Google token" });
  }
};

/* ------------------------------- USER SIGNUP ------------------------------- */
export const registerUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.status(201).json({
      token,
      user: formatUserResponse(req, newUser),
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

/* ------------------------------- USER LOGIN -------------------------------- */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Google users cannot log in with password
    if (user.googleId && !user.password) {
      return res.status(400).json({ message: "Please log in using Google" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.status(200).json({
      token,
      user: formatUserResponse(req, user),
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

/* --------------------------- SET PASSWORD (Google) -------------------------- */
export const setPassword = async (req, res) => {
  try {
    const { userId, password } = req.body;

    if (!userId || !password)
      return res.status(400).json({ message: "Missing userId or password" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ message: "Password set successfully" });
  } catch (error) {
    console.error("Set password error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
