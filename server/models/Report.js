import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  extractedText: { type: String, required: true },
  explanation: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Report", reportSchema);
