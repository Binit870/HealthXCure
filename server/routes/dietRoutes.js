// backend/routes/dietRoutes.js
import express from "express";
import multer from "multer";
import {
  generateDietPlan,
  getDietHistory,
  deleteDietPlan,
} from "../controllers/dietController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Keep protect for these routes. Frontend must send Authorization header.
router.post("/plan", protect, upload.single("report"), generateDietPlan);
router.get("/history", protect, getDietHistory);
router.delete("/history/:id", protect, deleteDietPlan);

export default router;
