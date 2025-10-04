import express from "express";
import { checkSymptoms, getSymptomHistory,deleteSymptomHistory } from "../controllers/symptomController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

// Route to check symptoms and save the result
router.post("/check",protect, checkSymptoms);

// Route to get the user's symptom history
router.get("/history",protect, getSymptomHistory);
router.delete("/history/:id",protect, deleteSymptomHistory);

export default router;