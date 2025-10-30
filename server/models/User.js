import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },

  // Password is optional for Google users
  password: { type: String, required: false, select: false },

  // Google account unique ID
  googleId: { type: String, unique: true, sparse: true },

  profileImageUrl: { type: String, default: "" },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
