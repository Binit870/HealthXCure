import axios from "axios";
import Doctor from "../models/Doctor.js";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

/**
 * 🌆 Fetch all unique city names
 */
export const getCities = async (req, res) => {
  try {
    const cities = await Doctor.distinct("city");
    res.status(200).json({ cities });
  } catch (error) {
    console.error("❌ Error fetching cities:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * 🔍 Fetch doctors by name/city + auto-geocode missing lat/lng
 */
export const getDoctorsFiltered = async (req, res) => {
  try {
    const { name, city } = req.query;

    const filter = {};
    if (name) filter.name = new RegExp(name, "i");
    if (city) filter.city = new RegExp(city, "i");

    const doctors = await Doctor.find(filter).limit(100);

    if (!doctors.length) {
      return res.status(404).json({ message: "No doctors found." });
    }

    // Auto-geocode missing coordinates
    const updatedDoctors = await Promise.all(
      doctors.map(async (doc) => {
        if (!doc.lat || !doc.lng) {
          try {
            const address = `${doc.address || ""}, ${doc.city || ""}`;
            const geoRes = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}`
            );

            const loc = geoRes.data.results[0]?.geometry.location;
            if (loc) {
              doc.lat = loc.lat;
              doc.lng = loc.lng;
              await doc.save();
            }
          } catch (err) {
            console.error("❌ Failed to geocode doctor:", doc.name, err.message);
          }
        }
        return doc;
      })
    );

    res.status(200).json(updatedDoctors);
  } catch (error) {
    console.error("❌ Error fetching doctors:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * 🧭 Google Directions API
 */
export const getDirections = async (req, res) => {
  const { originLat, originLng, destLat, destLng } = req.query;

  if (!originLat || !originLng || !destLat || !destLng) {
    return res.status(400).json({ message: "Missing required location parameters." });
  }

  try {
    const directionsResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${originLat},${originLng}&destination=${destLat},${destLng}&key=${GOOGLE_API_KEY}`
    );

    const route = directionsResponse.data.routes[0];
    if (!route) return res.status(404).json({ message: "No route found." });

    const leg = route.legs[0];
    res.status(200).json({
      distance: leg.distance.text,
      duration: leg.duration.text,
      url: `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${destLat},${destLng}&travelmode=driving`,
    });
  } catch (error) {
    console.error("Error fetching directions:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
