import axios from "axios";
import Doctor from "../models/Doctor.js";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export const getCities = async (req, res) => {
  try {
    const cities = await Doctor.distinct("city");
    res.status(200).json({ cities });
  } catch (error) {
    console.error("❌ Error fetching cities:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getFilters = async (req, res) => {
  try {
    const [cities, states, specializations] = await Promise.all([
      Doctor.distinct("city"),
      Doctor.distinct("state"),
      Doctor.distinct("specialization"),
    ]);
    res.status(200).json({ cities, states, specializations });
  } catch (error) {
    console.error("❌ Error fetching filters:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getDoctorsFiltered = async (req, res) => {
  try {
    const { search, city, state, specialization } = req.query;

    const filter = {};

    if (search) {
      filter.$or = [
        { name: new RegExp(search, "i") },
        { specialization: new RegExp(search, "i") },
      ];
    }

    if (city) filter.city = new RegExp(`^${city}$`, "i");
    if (state) filter.state = new RegExp(`^${state}$`, "i");
    if (specialization) filter.specialization = new RegExp(`^${specialization}$`, "i");

    const doctors = await Doctor.find(filter).limit(200);
    if (!doctors.length) return res.status(200).json([]);

    const updatedDoctors = await Promise.all(
      doctors.map(async (doc) => {
        if (!doc.lat || !doc.lng) {
          try {
            const address = `${doc.address || ""}, ${doc.city || ""}, ${doc.state || ""}`;
            const geoRes = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                address
              )}&key=${GOOGLE_API_KEY}`
            );
            const loc = geoRes.data.results[0]?.geometry.location;
            if (loc) {
              doc.lat = loc.lat;
              doc.lng = loc.lng;
              await doc.save();
            }
          } catch (err) {
            console.error("❌ Failed to geocode doctor:", doc.name);
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


export const getNearbyDoctors = async (req, res) => {
    const { lat, lng, maxDistance = 10000 } = req.query; // maxDistance default 10km in meters

    if (!lat || !lng) {
        return res.status(400).json({ message: "Missing latitude and longitude for nearby search." });
    }

    try {
        // Ensure you have a 'location' field in your Doctor model indexed as '2dsphere'
        const doctors = await Doctor.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(lng), parseFloat(lat)],
                    },
                    $maxDistance: parseInt(maxDistance), 
                },
            },
        }).limit(50); // Limit results for performance

        res.status(200).json(doctors);
    } catch (error) {
        console.error("❌ Error fetching nearby doctors:", error);
        // NOTE: Geospatial queries require a '2dsphere' index on the 'location' field.
        res.status(500).json({ 
            message: "Internal Server Error or Geospatial index missing.",
            details: error.message
        });
    }
};

/**
 * Gets the distance/duration and a Google Maps directions URL.
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
export const getDirections = async (req, res) => {
    const { originLat, originLng, destLat, destLng } = req.query;

    if (!originLat || !originLng || !destLat || !destLng)
        return res
            .status(400)
            .json({ message: "Missing required location parameters." });

    try {
        // 1. Call Google Directions API for meta-data
        const directionsResponse = await axios.get(
            `https://maps.googleapis.com/maps/api/directions/json?origin=${originLat},${originLng}&destination=${destLat},${destLng}&key=${GOOGLE_API_KEY}`
        );

        const route = directionsResponse.data.routes[0];
        if (!route) {
            return res.status(200).json({ message: "No route found by Google Maps API.", url: null });
        }

        const leg = route.legs[0];

        // 2. ✅ CRITICAL FIX: Generate the CORRECT Google Maps directions URL.
        const origin = `${originLat},${originLng}`;
        const destination = `${destLat},${destLng}`;
        
        // This is the standard, valid URL format for opening Google Maps navigation:
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;

        res.status(200).json({
            distance: leg.distance.text,
            duration: leg.duration.text,
            url: mapsUrl, // This is the correct URL
        });
    } catch (error) {
        console.error("❌ Error fetching directions:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};