// backend/routes/dietRoutes.js
import express from "express";
import multer from "multer";
import { generateDietPlan } from "../controllers/dietController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });


router.post("/plan", upload.single("report"), generateDietPlan);

export default router;
