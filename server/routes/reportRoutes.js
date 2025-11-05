import express from "express";
import multer from "multer";
import { analyzeReport, getReportsHistory, deleteReport } from "../controllers/reportController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/analyze", upload.single("file"), analyzeReport);
router.get("/history", getReportsHistory);
router.delete("/delete/:id", deleteReport);

export default router;