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

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { name, email, picture, sub } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      // Create Google user with a hashed random password (secure)
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
      // Attach Google ID if user exists but was manual signup
      user.googleId = sub;
      await user.save();
    }

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

    // Select password explicitly because we set `select: false` in schema
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Google users cannot login with password
    if (user.googleId && !user.password) {
      return res.status(400).json({ message: "Please log in using Google" });
    }

    // Compare password
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
