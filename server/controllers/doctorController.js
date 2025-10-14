import axios from "axios";
import Doctor from "../models/Doctor.js";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const BETTER_DOCTOR_RAPID_API_KEY = process.env.BETTER_DOCTOR_RAPID_API_KEY;

/**
 * 🔍 Local MongoDB Search by city with geocoding fallback
 */
export const getDoctorsByCity = async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ message: "City is required." });
    }

    const doctors = await Doctor.find({
      city: { $regex: new RegExp(`^${city}$`, "i") },
    });

    if (!doctors.length) {
      return res.status(404).json({ message: "No doctors found in this city." });
    }

    const geocodedDoctors = await Promise.all(
      doctors.map(async (doc) => {
        if (!doc.lat || !doc.lng) {
          try {
            const geoRes = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(doc.address)}&key=${GOOGLE_API_KEY}`
            );

            const loc = geoRes.data.results[0]?.geometry.location;
            if (loc) {
              doc.lat = loc.lat;
              doc.lng = loc.lng;
              await doc.save();
            }
          } catch (err) {
            console.error("Geocoding failed for doctor:", doc.name, err.message);
          }
        }
        return doc;
      })
    );

    res.status(200).json(geocodedDoctors);
  } catch (error) {
    console.error("❌ Error fetching doctors by city:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * 🔍 Filter doctors by name and city
 */
export const filterDoctorsByCity = async (req, res) => {
  try {
    const { name, city } = req.query;

    const query = {};
    if (name) query.name = new RegExp(name, "i");
    if (city) query.city = city;

    const doctors = await Doctor.find(query).limit(100);

    if (!doctors.length) {
      return res.status(404).json({ message: "No doctors found." });
    }

    res.status(200).json(doctors);
  } catch (error) {
    console.error("❌ Error filtering doctors:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

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
 * 🧭 Google Maps + Places API Search
 */
export const searchDoctors = async (req, res) => {
  const { query, lat, lng } = req.query;

  if (!query) {
    return res.status(400).json({ message: "Search query is required." });
  }

  try {
    let location = null;

    if (lat && lng) {
      location = { lat, lng };
    } else {
      const geocodeResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=${GOOGLE_API_KEY}`
      );

      const results = geocodeResponse.data.results;
      if (results?.length) {
        location = results[0].geometry.location;
      }
    }

    if (!location) {
      return res.status(404).json({ message: "Location not found." });
    }

    const placesResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=50000&keyword=${encodeURIComponent(query)}&type=doctor|hospital|clinic&key=${GOOGLE_API_KEY}`
    );

    const placesResults = placesResponse.data.results || [];

    const doctors = placesResults.map((place) => ({
      id: place.place_id,
      name: place.name,
      address: place.vicinity,
      category: place.types.join(", "),
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
    }));

    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error in search:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * 🌍 RapidAPI (BetterDoctor) Fallback
 */
const cityCoordinates = {
  mumbai: "19.0760,72.8777,100",
  delhi: "28.6139,77.2090,100",
  bangalore: "12.9716,77.5946,100",
  kolkata: "22.5726,88.3639,100",
  chennai: "13.0827,80.2707,100",
};

export const getDoctors = async (req, res) => {
  try {
    const { city } = req.query;
    const location =
      cityCoordinates[city?.toLowerCase()] || cityCoordinates["mumbai"];

    const response = await axios.get(
      "https://betterdoctor.p.rapidapi.com/practice_search",
      {
        headers: {
          "x-rapidapi-key": BETTER_DOCTOR_RAPID_API_KEY,
          "x-rapidapi-host": "betterdoctor.p.rapidapi.com",
        },
        params: {
          location,
          user_location: location.split(",").slice(0, 2).join(","),
          skip: 0,
          limit: 10,
        },
      }
    );

    res.json({ doctors: response.data.data || [] });
  } catch (error) {
    console.error("❌ Error in getDoctors:", error);
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
};

/**
 * 🚗 Directions API
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
