// backend/models/Diet.js
import mongoose from "mongoose";

const dietSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    age: String,
    gender: String,
    height: String,
weight: String,

    goal: String,
    dietType: String,
    preferences: String,
    reason: String,
    days: Number,
    symptoms: String,
    diseases: String,     // <-- added
    report: String,       // <-- filename of uploaded report
    reportText: String,   // <-- extracted insights from report (if any)
    plan: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Diet", dietSchema);
