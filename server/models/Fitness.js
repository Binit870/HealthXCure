import mongoose from "mongoose";

const fitnessSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // later link with logged-in user
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  bmi: { type: Number, required: true },
  category: { type: String, required: true },
  calories: { type: String, required: true },
  plan: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Fitness", fitnessSchema);
