import { Router } from "express";
import { getDoctorsFiltered, getFilters, getDirections, getNearbyDoctors } from "../controllers/doctorController.js";

const router = Router();

router.get("/search/filters", getFilters);

router.get("/search/doctors", getDoctorsFiltered); 
router.get("/search/doctors/nearby", getNearbyDoctors);
// NEW route for getting directions
router.get("/search/directions", getDirections);


export default router;