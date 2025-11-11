import fs from "fs";
import path from "path";
import PDFParser from "pdf2json";
import mammoth from "mammoth";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 🧠 Chat with AI (text input)
export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

   const prompt = `
You are **Cura**, a friendly and knowledgeable AI Health Assistant.

🧠 **Tone**: warm, conversational, and easy to understand — like a caring health coach.  
📋 **Goal**: give clear, helpful answers in **3–5 short sentences**.  
✨ **Style**: use light **Markdown formatting** — bold for key terms, bullet points for lists, and short paragraphs. **Do not use emojis.**

---

### 🩺 Guidelines:
- Focus on **practical advice**, **daily health tips**, and **common-sense suggestions**.
- Use short headings (e.g., **Tips**, **Reminder**, **Did You Know?**) if it helps organize the reply.
- End with a friendly suggestion or reminder the user can act on.
- Avoid repeating the user's question.
- Skip long paragraphs or complex medical jargon.
- If the question is unrelated to health, reply: "I'm designed to answer health-related queries only."

---

### 🔍 **New Rule — Doctor Suggestion:**
After giving your health advice:
- Analyze the **symptoms or condition** mentioned.
- Suggest the **most appropriate doctor or specialist** to consult (e.g., **Dermatologist**, **Cardiologist**, **ENT Specialist**, **General Physician**, etc.).
- Format it as:  
  **Suggested Doctor:** *Type of Specialist*

---

User’s Question:
${message}

Now write a friendly, natural-sounding reply:
`;


    const result = await model.generateContent(prompt);
    const reply = result.response.text().trim();

    res.json({ reply });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Something went wrong with the AI service" });
  }
};

// 📄 Extract text from PDF
const extractTextFromPDF = (filePath) => {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();
    pdfParser.on("pdfParser_dataError", (err) => reject(err.parserError));
    pdfParser.on("pdfParser_dataReady", () => {
      resolve(pdfParser.getRawTextContent());
    });
    pdfParser.loadPDF(filePath);
  });
};

// 📄 Extract text from DOCX
const extractTextFromDocx = async (filePath) => {
  const result = await mammoth.extractRawText({ path: filePath });
  return result.value;
};

// 📁 Upload file and summarize
export const uploadFileToAI = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const filePath = file.path;
    const mimeType = file.mimetype;
    const ext = path.extname(file.originalname).toLowerCase();
    let extractedText = "";

    // 🧾 Handle PDFs
    if (mimeType === "application/pdf") {
      extractedText = await extractTextFromPDF(filePath);
    }

    // 📄 Handle Word Docs (.docx)
    else if (ext === ".docx" || mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      extractedText = await extractTextFromDocx(filePath);
    }

    // 📄 Handle Plain Text
    else if (mimeType === "text/plain" || ext === ".txt") {
      extractedText = fs.readFileSync(filePath, "utf-8");
    }

    // 🖼 Handle Images
    else if (mimeType.startsWith("image/")) {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent([
        "You are cura a health assistant. Extract health-related information from this image. Use Markdown formatting and suggest the type of doctor to consult if needed.",
        {
          inlineData: {
            data: fs.readFileSync(filePath).toString("base64"),
            mimeType,
          },
        },
      ]);
      fs.unlinkSync(filePath);
      return res.json({ reply: result.response.text().trim() });
    }

    // ❌ Unsupported
    else {
      fs.unlinkSync(filePath);
      return res.json({ reply: `Unsupported file type: ${mimeType}` });
    }

    // 🧠 Summarize extracted text
    if (extractedText.trim()) {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `
You are **Cura**, a helpful AI Health Assistant.

📄 A user has uploaded a health-related document. Your task is to:
- Extract and summarize the **key health insights**.
- Present the summary in **3–5 short bullet points**.
- Use **Markdown formatting**: bold for key terms, bullet points for clarity.
- Keep the tone friendly and easy to understand.
- **Do not use emojis in your response.**

---

### 🩺 Doctor Suggestion Rule:
After summarizing the document:
- Analyze the **health information or symptoms**.
- Suggest the **most appropriate doctor or specialist** (e.g., **Dermatologist**, **Cardiologist**, **ENT Specialist**, **General Physician**, etc.).
- Format it as:  
  **Suggested Doctor:** *Type of Specialist*

---

Here is the document content:
${extractedText}

Now write a clear and helpful summary:
`;


      const result = await model.generateContent(prompt);
      fs.unlinkSync(filePath);
      return res.json({ reply: result.response.text().trim() });
    }

    fs.unlinkSync(filePath);
    res.json({ reply: "No readable content found in the file." });
  } catch (error) {
    console.error("File Upload Error:", error);
    res.status(500).json({ error: "Failed to process file" });
  }
};
