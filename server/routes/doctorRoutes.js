import { Router } from 'express';
import {getDoctors , searchDoctors } from '../controllers/doctorController.js';

const router = Router();

// This endpoint will be used by your frontend to search for doctors.
router.get('/search/doctors', searchDoctors);
router.get("/practice_search", getDoctors);
// router.get("/specialties", getSpecialties);
// router.get('/directions', getDirections);
export default router;