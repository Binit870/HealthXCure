// backend/controllers/dietController.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import Diet from "../models/Diet.js";
import User from "../models/User.js";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate & Save Diet Plan
export const generateDietPlan = async (req, res) => {
  try {
    // Prefer authenticated user id if present (route is protected)
    const authUserId = req.user?._id;
    // Accept fields from body as fallback (if you ever call this internally)
    const {
  age,
  gender,
  height,
  weight,
  goal = "Weight Loss",
  dietType = "Vegetarian",
  preferences,
  reason = "General Health",
  days = 7,
  symptoms,
  diseases,
  userId: bodyUserId,
} = req.body;


    const userId = authUserId || bodyUserId;
    if (!userId) {
      return res.status(400).json({ success: false, error: "userId missing" });
    }

    let reportText = "";
    let reportName = null;

    if (req.file) {
      // store filename and try to extract insights with the vision model
      reportName = req.file.originalname;
      const fileBuffer = fs.readFileSync(req.file.path);
      const base64Data = fileBuffer.toString("base64");

      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-vision" });
        const result = await model.generateContent([
          { inlineData: { data: base64Data, mimeType: req.file.mimetype } },
          "Extract relevant medical/nutritional insights from this health report and summarize concisely."
        ]);
        // .response.text() might be library-specific; keep defensive:
        reportText = typeof result?.response?.text === "function" ? result.response.text() : (result?.response?.content || "");
      } catch (visionErr) {
        console.error("Vision model error:", visionErr);
        // don't fail whole request for vision extraction — just continue
        reportText = "";
      } finally {
        // cleanup local temp file
        try { fs.unlinkSync(req.file.path); } catch (_) {}
      }
    }

    // Compose prompt for text model
    const prompt = `
You are a certified nutritionist AI. Create a diet plan:

- Age: ${age || "Not provided"}
- Gender: ${gender || "Not provided"}
- Height: ${height || "Not provided"} cm
- Weight: ${weight || "Not provided"} kg

- Goal: ${goal}
- Diet Preference: ${dietType}
- Reason for Diet: ${reason}
- Days Requested: ${days || 7}
- Extra Notes: ${preferences || "None"}
- Symptoms: ${symptoms || "None"}
- Diseases: ${diseases || "None"}
- Health Report Insights: ${reportText || "No report uploaded"}

Instructions:
- Address symptoms and diseases first (foods/remedies).
- Then create a ${days || 7}-day plan (Breakfast, Lunch, Snacks, Dinner).
- Balanced nutrition.
- Output in **markdown format** with headings and bullet points.
`;

    const textModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const response = await textModel.generateContent(prompt);
    const plan = typeof response?.response?.text === "function" ? response.response.text() : (response?.response?.content || "");

    // Save to DB
    const newDiet = await Diet.create({
  userId,
  age,
  gender,
  height,
  weight,
  goal,
  dietType,
  preferences,
  reason,
  days,
  symptoms,
  diseases,
  plan,
  report: reportName,
  reportText,
});


    // Return the full saved object
    res.json({ success: true, newDiet });
  } catch (error) {
    console.error("Diet Plan Error:", error);
    res.status(500).json({ success: false, error: "Failed to generate diet plan" });
  }
};

// Save Diet History (if you ever need this endpoint)
export const saveDietHistory = async (req, res) => {
  try {
    const { userId, plan } = req.body;
    const newDiet = await Diet.create({ userId, plan });
    res.json({ success: true, diet: newDiet });
  } catch (error) {
    console.error("Save History Error:", error);
    res.status(500).json({ success: false, error: "Failed to save diet history" });
  }
};

// Get Diet History (protected)
export const getDietHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const history = await Diet.find({ userId }).sort({ createdAt: -1 });
    // console.log("History being sent:", history); // 👈 add this
    res.json(history);
  } catch (error) {
    console.error("History Fetch Error:", error);
    res.status(500).json({ error: "Failed to fetch history" });
  }
};


// Delete Diet by ID (protected + ownership check)
export const deleteDietPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const diet = await Diet.findById(id);
    if (!diet) {
      return res.status(404).json({ success: false, message: "Diet plan not found" });
    }

    // Ensure the requesting user owns this diet plan
    if (req.user && diet.userId && diet.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to delete this plan" });
    }

    await Diet.findByIdAndDelete(id);
    res.json({ success: true, message: "Diet plan deleted" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ success: false, error: "Failed to delete diet plan" });
  }
};
