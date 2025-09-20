
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// 📌 Symptom Checker with Gemini
export const checkSymptoms = async (req, res) => {
  try {
    const { symptoms, age, gender } = req.body;

    if (!symptoms || symptoms.length === 0) {
      return res.status(400).json({ error: "Please provide symptoms" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are a medical assistant AI.
  The user is a ${age}-year-old ${gender}. They have the following symptoms: ${symptoms.join(",")}.
Based on this, provide a list of the top 5 most likely health conditions.
For each condition, include:
- A brief name.
- A simple, one-sentence description.
- An urgency level: "Non-Urgent," "Urgent Care," or "Emergency."
- If non-urgemt share some common treatments or medicine
- A call to action (CTA) in the form of simple, actionable advice.

Format the response as a single JSON object with a key "conditions" that contains an array of these objects.
Example JSON response:
{
  "conditions": [
    {
      "name": "Common Cold",
      "description": "A viral infection of the nose and throat, causing sneezing and a stuffy nose.",
      "urgency_level": "Non-Urgent",
      "treatments": "Over-the-counter cold remedies, rest, and hydration.",
      "medicine" : "Paracetamol or ibuprofen for fever and aches.",
      "cta": "Rest and drink plenty of fluids. Symptoms usually resolve within a week."
    }
  ]
}
`;

    const result = await model.generateContent(prompt);
    const textResponse = result.response.text();

    // ✅ NEW AND IMPROVED FIX: Extract the JSON string from the response
    const jsonStartIndex = textResponse.indexOf('{');
    const jsonEndIndex = textResponse.lastIndexOf('}');

    // Check if both start and end characters were found
    if (jsonStartIndex !== -1 && jsonEndIndex !== -1) {
      const jsonString = textResponse.substring(jsonStartIndex, jsonEndIndex + 1);
      const parsedData = JSON.parse(jsonString);
      return res.json(parsedData);
    } else {
      // Handle cases where no valid JSON is found
      return res.status(200).json({
        error: "AI did not return a valid JSON object. Please try again.",
        rawResponse: textResponse
      });
    }

  } catch (error) {
    console.error("Error checking symptoms:", error);
    if (error instanceof SyntaxError) {
      return res.status(200).json({
        error: "AI response was not in the expected format. Please try again.",
        rawResponse: error.message
      });
    }
    res.status(500).json({ error: "Failed to check symptoms due to a server error." });
  }
};