import { GoogleGenerativeAI } from "@google/generative-ai";

import dotenv from "dotenv";
import SymptomHistory from "../models/SymptomHistory.js"; // Assuming a Mongoose model
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 📌 Symptom Checker with Gemini
export const checkSymptoms = async (req, res) => {
  try {
    const { symptoms, age, gender } = req.body;
    const userId = req.user.id;

    if (!symptoms || symptoms.length === 0) {
      return res.status(400).json({ error: "Please provide symptoms" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
You are an intelligent and empathetic AI medical assistant.

The user is a ${age}-year-old ${gender}. They are experiencing the following symptoms: ${symptoms.join(", ")}.

Based on these symptoms, list the **top 4 most likely health conditions**.

For each condition, include:
- "name": The medical condition name.
- "description": A short, simple explanation.
- "possibility": A number between 0 and 100 representing the likelihood (% chance).
- "urgency": One of "Non-Urgent", "Urgent Care", or "Emergency".
- "recommended_doctor": The best type of doctor to consult. Do not default to "General Physician" unless absolutely necessary. Use specialized doctors (e.g., Cardiologist, Dermatologist, Neurologist, ENT Specialist, Pulmonologist, Gastroenterologist, etc.) based on the body system affected.
- "first_step": The first action the user should take right now.

Return only valid JSON:
{
  "conditions": [
    {
      "name": "Migraine",
      "description": "A type of headache causing severe throbbing pain.",
      "possibility": 75,
      "urgency": "Non-Urgent",
      "recommended_doctor": "Neurologist",
      "first_step": "Rest in a dark room and take a mild pain reliever."
    }
  ]
}
`;


    const result = await model.generateContent(prompt);
    const textResponse = result.response.text();

    const jsonStart = textResponse.indexOf("{");
    const jsonEnd = textResponse.lastIndexOf("}");
    if (jsonStart !== -1 && jsonEnd !== -1) {
      const jsonString = textResponse.substring(jsonStart, jsonEnd + 1);
      const parsedData = JSON.parse(jsonString);

      // 💾 Save to DB
      const newHistoryEntry = new SymptomHistory({
        user: userId,
        symptoms,
        age,
        gender,
        results: parsedData.conditions,
      });
      await newHistoryEntry.save();

      return res.json(parsedData);
    } else {
      return res.status(200).json({
        error: "AI did not return a valid JSON object. Please try again.",
        rawResponse: textResponse,
      });
    }
  } catch (error) {
    console.error("Error checking symptoms:", error);
    if (error instanceof SyntaxError) {
      return res.status(200).json({
        error: "AI response was not in the expected format.",
        rawResponse: error.message,
      });
    }
    res.status(500).json({ error: "Failed to check symptoms due to a server error." });
  }
};



// 📌 NEW: Get Symptom History
// 📌 Get Symptom History
export const getSymptomHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        // ✅ Add .lean() to the query
        const history = await SymptomHistory.find({ user: userId }).sort({ createdAt: -1 }).lean();
        res.json({ history });
    } catch (error) {
        console.error("Error fetching symptom history:", error);
        res.status(500).json({ error: "Failed to fetch history." });
    }
};

export const deleteSymptomHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await SymptomHistory.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "History entry not found" });
    }

    return res.status(200).json({ message: "History entry deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting history:", error);
    return res.status(500).json({ message: "Server error while deleting history" });
  }
};