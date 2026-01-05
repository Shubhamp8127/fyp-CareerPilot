// backend/controllers/resumeController.js
import dotenv from "dotenv"; // ✅ Must be first
dotenv.config();

import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import path from "path";

// 🔹 Check GEMINI_API_KEY
if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY missing in .env");
}

// 🔹 Initialize Gemini with v1 API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY, {
  apiVersion: "v1", // 🔥 v1 API
});

export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No resume uploaded" });
    }

    // 1️⃣ Extract text from PDF (Windows-safe path)
    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(req.file.buffer),
      standardFontDataUrl: `file:///${path.join(
        process.cwd(),
        "node_modules/pdfjs-dist/legacy/build/"
      ).replace(/\\/g, "/")}/`, // ✅ Windows safe + trailing slash
    });

    const pdf = await loadingTask.promise;

    let resumeText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      resumeText += content.items.map((item) => item.str).join(" ") + "\n";
    }

    if (!resumeText.trim()) {
      return res.status(400).json({ error: "Unable to read resume text" });
    }

    // 2️⃣ Use supported Gemini model
    const model = genAI.getGenerativeModel({
      model: "gemini-pro", // ✅ v1 API supported model
    });

    // 3️⃣ Strict JSON prompt
    const prompt = `
Return ONLY valid JSON:
{
  "atsScore": number,
  "missingSkills": [],
  "recommendedRoles": [],
  "improvementTips": []
}

Resume:
${resumeText.slice(0, 3000)}
`;

    // 4️⃣ Generate AI response
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // 5️⃣ Safe JSON parse
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
    const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1));

    return res.json(parsed);
  } catch (err) {
    console.error("Resume analysis error:", err.message);
    return res.status(500).json({ error: err.message });
  }
};

// 🔹 Debug: check GEMINI_API_KEY loaded
console.log("Loaded GEMINI_API_KEY:", process.env.GEMINI_API_KEY ? "YES" : "NO");
