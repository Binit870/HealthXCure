// controllers/doctorController.js
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
