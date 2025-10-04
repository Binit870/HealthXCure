// src/routes/fitnessRoutes.js
import express from "express";
import { generateFitnessPlan, saveFitnessData, getFitnessHistory, deleteFitnessEntry } from "../controllers/fitnessController.js";

const router = express.Router();
router.post("/plan", generateFitnessPlan);
router.post("/save", saveFitnessData);
router.get("/history/:userId", getFitnessHistory);
router.delete("/history/:entryId", deleteFitnessEntry); // ✅ New route for deleting a single entry

export default router;