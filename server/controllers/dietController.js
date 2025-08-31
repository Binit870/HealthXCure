// backend/controllers/dietController.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateDietPlan = async (req, res) => {
  try {
    const { age, gender, goal, dietType, preferences, reason, days, symptoms } = req.body;

    let reportText = "";
    if (req.file) {
      const fileBuffer = fs.readFileSync(req.file.path);
      const base64Data = fileBuffer.toString("base64");

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-vision" });

      const result = await model.generateContent([
        { inlineData: { data: base64Data, mimeType: req.file.mimetype } },
        "Extract relevant medical/nutritional insights from this health report and summarize concisely."
      ]);

      reportText = result.response.text();
      fs.unlinkSync(req.file.path); // cleanup
    }

    const prompt = `
      You are a certified nutritionist AI. Create a diet plan based on the following info:

      - Age: ${age || "Not provided"}
      - Gender: ${gender || "Not provided"}
      - Goal: ${goal}
      - Diet Preference: ${dietType}
      - Reason for Diet: ${reason}
      - Days Requested: ${days || 7}
      - Extra Notes: ${preferences || "None"}
      - Symptoms: ${symptoms || "None"}
      - Health Report Insights: ${reportText || "No report uploaded"}

      Instructions:
      - If symptoms are present, provide foods/remedies for those symptoms first.
      - Then create a diet plan for ${days || 7} days with breakfast, lunch, snacks, and dinner.
      - Ensure nutritional balance.
      - Output in **markdown format** with headings (Day 1, Day 2...) and bulleted meals.
    `;

    const textModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const response = await textModel.generateContent(prompt);

    const plan = response.response.text();

    res.json({ plan });
  } catch (error) {
    console.error("Diet Plan Error:", error);
    res.status(500).json({ error: "Failed to generate diet plan" });
  }
};
