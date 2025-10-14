import { Router } from "express";
import {
  getDoctors,
  searchDoctors,
  getDirections,
  filterDoctorsByCity,
  getCities,
  getDoctorsByCity,
} from "../controllers/doctorController.js";
import Doctor from "../models/Doctor.js"; // ✅ Add this line

const router = Router();

// 🔍 Local MongoDB Search
router.get("/doctors/by-city", getDoctorsByCity);

// ✅ Fixed: Declare variables before logging
router.get("/search/doctors", async (req, res) => {
  try {
    const { name, city } = req.query;

    const filter = {};
    if (name) filter.name = new RegExp(name, "i");
    if (city) filter.city = city;

    const doctors = await Doctor.find(filter).limit(100);

    console.log("🔍 Filter:", filter);
    console.log("📦 Found doctors:", doctors.length);

    res.json(doctors);
  } catch (err) {
    console.error("❌ Error fetching doctors:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 🌆 Unique cities for dropdown
router.get("/doctors/cities", getCities);
router.get("/search/filters", getCities);

// 🧭 Google Places API
router.get("/search/doctors/google", searchDoctors);

// 🌍 RapidAPI fallback
router.get("/practice_search", getDoctors);

// 🚗 Directions API
router.get("/directions", getDirections);

export default router;
