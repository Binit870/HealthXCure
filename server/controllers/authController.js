import User from "../models/User.js";
import { OAuth2Client } from "google-auth-library";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ✅ Helper to format user response with absolute image URL
const formatUserResponse = (req, user) => {
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const userObj = user.toObject ? user.toObject() : user; // Handle both Mongoose doc & plain obj
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

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { name, email, picture } = payload;

    // Check if user already exists
    let user = await User.findOne({ email });

    // If not, create a new one
    if (!user) {
      user = await User.create({
        name,
        username: email.split("@")[0],
        email,
        password: "google_oauth",
        profileImageUrl: picture,
      });
    }

    // Generate JWT
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({
      token: jwtToken,
      user: formatUserResponse(req, user),
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(401).json({ message: "Invalid Google token" });
  }
};

/* ------------------------------- USER SIGNUP ------------------------------- */
export const registerUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

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

    res.status(201).json({
      token,
      user: formatUserResponse(req, newUser),
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

/* ------------------------------- USER LOGIN -------------------------------- */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent password login for Google users
    if (user.password === "google_oauth") {
      return res.status(400).json({
        message: "Please log in using Google",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({
      token,
      user: formatUserResponse(req, user),
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
