import PDFParser from "pdf2json";
import Tesseract from "tesseract.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Report from "../models/Report.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeReport = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    let extractedText = "";

    if (req.file.mimetype === "application/pdf") {
      extractedText = await extractTextFromPDF(req.file.buffer);
    } else if (["image/png", "image/jpeg"].includes(req.file.mimetype)) {
      const result = await Tesseract.recognize(req.file.buffer, "eng");
      extractedText = result.data.text;
    } else {
      return res.status(400).json({ error: "Only PDF, JPG, or PNG allowed" });
    }

    if (!extractedText.trim()) {
      return res.status(400).json({ error: "Could not extract text from file" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `
      You are a medical assistant. A patient uploaded a report.
      Here is the extracted text:
      ---
      ${extractedText}
      ---
      Please explain this report in simple language, highlight key points, and suggest next steps.
    `;
    const result = await model.generateContent(prompt);
    const explanation = result.response.text();

    const newReport = new Report({
      name: req.file.originalname,
      extractedText,
      explanation,
    });
        await newReport.save();

    res.json({
      success: true,
      extractedText,
      explanation,
    });
  } catch (error) {
    console.error("Report analysis error:", error);
    res.status(500).json({ error: "Something went wrong while analyzing report" });
  }
};

// Helper function to extract text from PDF
const extractTextFromPDF = (buffer) => {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", (errData) => {
      reject(errData.parserError);
    });

    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      let text = "";
      pdfData.Pages.forEach((page) => {
        page.Texts.forEach((t) => {
          t.R.forEach((r) => {
            text += decodeURIComponent(r.T) + " ";
          });
        });
      });
      resolve(text.trim());
    });

    pdfParser.parseBuffer(buffer);
  });
};

// ✅ Fetch all reports for history
export const getReportsHistory = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 }); // newest first
    res.json(reports);
  } catch (error) {
    console.error("Error fetching reports history:", error);
    res.status(500).json({ error: "Failed to fetch reports history" });
  }
};
export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    await Report.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting report:", error);
    res.status(500).json({ error: "Failed to delete report" });
  }
};
