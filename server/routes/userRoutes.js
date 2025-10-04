import express from "express";
import multer from "multer";
import path from "path";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Ensure 'uploads' directory exists
import fs from "fs";
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const sanitizedName = file.originalname.replace(/\s+/g, "_");
    cb(null, `${req.user._id}-${Date.now()}-${sanitizedName}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Only JPEG, PNG, and WEBP images are allowed"));
  },
});

// Upload route
router.post("/:id/profile-image", protect, upload.single("profileImage"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const imagePath = `/uploads/${req.file.filename}`;
    user.profileImageUrl = imagePath;
    await user.save();

    console.log("✅ Image saved:", imagePath);
    res.status(200).json({
      message: "Profile image updated successfully.",
      user,
    });
  } catch (error) {
    console.error("❌ Image upload failed:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
});

export default router;
