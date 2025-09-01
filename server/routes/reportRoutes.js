import express from "express";
import multer from "multer";
import { analyzeReport, getReportsHistory, deleteReport } from "../controllers/reportController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// POST analyze
router.post("/analyze", upload.single("file"), analyzeReport);

// GET history
router.get("/history", getReportsHistory);
router.delete("/delete/:id", deleteReport);
export default router;
