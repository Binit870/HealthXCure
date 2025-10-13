import { Router } from "express";
import {
  getDoctors,
  searchDoctors,
  getDirections,
  filterDoctorsByCity,
  getCities,
} from "../controllers/doctorController.js";
import Doctor from "../models/Doctor.js"; // ✅ Add this line
import { getDoctorsByCity } from "../controllers/doctorController.js";


const router = Router();
router.get("/doctors/by-city", getDoctorsByCity);
// ✅ Get unique cities from MongoDB
router.get("/search/filters", async (req, res) => {
  try {
    const cities = await Doctor.distinct("city", { city: { $ne: "" } }); // get unique city names
    res.json({ cities });
  } catch (err) {
    console.error("❌ Error fetching cities:", err);
    res.status(500).json({ message: "Failed to load cities" });
  }
});

// ✅ Local MongoDB Doctor Search (filters by name and city)
router.get("/search/doctors", async (req, res) => {
  try {
    const { query, city } = req.query;

    const filter = {};
    if (query) filter.name = new RegExp(query, "i");
    if (city) filter.city = city;

    const doctors = await Doctor.find(filter).limit(100);
    res.json(doctors);
  } catch (err) {
    console.error("❌ Error fetching doctors:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ NEW: Fetch all unique cities for dropdown
router.get("/doctors/cities", async (req, res) => {
  try {
    const cities = await Doctor.distinct("city");
    res.json({ cities });
  } catch (err) {
    console.error("❌ Error fetching cities:", err);
    res.status(500).json({ message: "Failed to fetch cities" });
  }
});

// 🧭 Google Places (optional)
router.get("/search/doctors/google", searchDoctors);

// 🌍 RapidAPI fallback
router.get("/practice_search", getDoctors);

// 🚗 Directions API
router.get("/directions", getDirections);

export default router;
