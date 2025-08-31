import fs from "fs";
import PDFParser from "pdf2json";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 📌 Chat with AI (text-based)
export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are a health assistant. 
Answer ONLY health-related questions (fitness, nutrition, medicine, mental health, lifestyle). 
If the user asks anything unrelated, reply: 
"I'm designed to answer health-related queries only."

User's Question: ${message}
    `;

    const result = await model.generateContent(prompt);
    res.json({ reply: result.response.text() });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Something went wrong with the AI service" });
  }
};

// 📌 Helper → Extract text from PDF with pdf2json
const extractTextFromPDF = (filePath) => {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", (err) => reject(err.parserError));
    pdfParser.on("pdfParser_dataReady", () => {
      const text = pdfParser.getRawTextContent();
      resolve(text);
    });

    pdfParser.loadPDF(filePath);
  });
};

// 📌 File Upload (PDFs & Images)
export const uploadFileToAI = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    let extractedText = "";
    const filePath = file.path;

    if (file.mimetype === "application/pdf") {
      // ✅ Handle PDF with pdf2json
      extractedText = await extractTextFromPDF(filePath);
    } else if (file.mimetype.startsWith("image/")) {
      // ✅ Handle Image with Gemini Vision
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent([
        "You are a health assistant. Extract health-related information from this image.",
        {
          inlineData: {
            data: fs.readFileSync(filePath).toString("base64"),
            mimeType: file.mimetype,
          },
        },
      ]);

      fs.unlinkSync(filePath); // cleanup
      return res.json({ reply: result.response.text() });
    } else {
      fs.unlinkSync(filePath);
      return res.json({ reply: `Unsupported file type: ${file.mimetype}` });
    }

    // ✅ If text extracted (PDF), send to Gemini
    if (extractedText) {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
You are a health assistant. Summarize the health-related information from this document:
${extractedText}
      `;

      const result = await model.generateContent(prompt);

      fs.unlinkSync(filePath); // cleanup
      return res.json({ reply: result.response.text() });
    }

    fs.unlinkSync(filePath);
    res.json({ reply: "No readable content found in the file." });
  } catch (error) {
    console.error("File Upload Error:", error);
    res.status(500).json({ error: "Failed to process file" });
  }
};

// 📌 Symptom Checker with Gemini
export const checkSymptoms = async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms || symptoms.length === 0) {
      return res.status(400).json({ error: "Please provide symptoms" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are a medical assistant AI.
The user has the following symptoms: ${symptoms.join(", ")}.
List the top 5 most likely possible health conditions in simple language.
Also, suggest whether the user should see a doctor urgently or monitor symptoms at home.
    `;

    const result = await model.generateContent(prompt);

    res.json({
      input: symptoms,
      conditions: result.response.text(),
    });
  } catch (error) {
    console.error("Error checking symptoms:", error.message);
    res.status(500).json({ error: "Failed to check symptoms" });
  }
};
