import express from "express";
import multer from "multer";
import { chatWithAI, uploadFileToAI, checkSymptoms } from "../controllers/aiController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/chat", chatWithAI);
router.post("/upload", upload.single("file"), uploadFileToAI);
router.post("/diagnosis/check", checkSymptoms);

export default router;
