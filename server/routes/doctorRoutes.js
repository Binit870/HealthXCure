// routes/doctorRoutes.js
import { Router } from "express";
import { getDoctorsFiltered, getFilters } from "../controllers/doctorController.js";

const router = Router();

router.get("/search/filters", getFilters);
router.get("/search/doctors", getDoctorsFiltered);

export default router;
