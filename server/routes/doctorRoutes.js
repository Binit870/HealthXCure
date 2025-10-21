import { Router } from "express";
import axios from "axios";
import Doctor from "../models/Doctor.js";

const router = Router();

// ✅ Fetch all distinct cities for dropdown
router.get("/search/filters", async (req, res) => {
  try {
    const cities = await Doctor.distinct("city");
    res.json({ cities });
  } catch (err) {
    console.error("Error fetching cities:", err);
    res.status(500).json({ message: "Error fetching cities" });
  }
});

// ✅ Unified doctor search route (by name or city)
router.get("/search/doctors", async (req, res) => {
  try {
    const { name, city } = req.query;

    const filter = {};
    if (name) filter.name = new RegExp(name, "i");
    if (city) filter.city = city;

    const doctors = await Doctor.find(filter).limit(100);
    if (!doctors.length) {
      return res.status(404).json({ message: "No doctors found" });
    }

    // ✅ Fill missing lat/lng values dynamically using Google Geocoding API
    const updatedDoctors = await Promise.all(
      doctors.map(async (doc) => {
        if (!doc.lat || !doc.lng) {
          try {
            const fullAddress = `${doc.address || ""}, ${doc.city || ""}`;
            const geoRes = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                fullAddress
              )}&key=${process.env.GOOGLE_API_KEY}`
            );

            const loc = geoRes.data.results[0]?.geometry?.location;
            if (loc) {
              doc.lat = loc.lat;
              doc.lng = loc.lng;
              await doc.save(); // ✅ persist in DB for future
            }
          } catch (err) {
            console.error(`❌ Failed to geocode: ${doc.name} (${doc.city})`);
          }
        }
        return doc;
      })
    );

    res.json(updatedDoctors);
  } catch (err) {
    console.error("Error fetching doctors:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
