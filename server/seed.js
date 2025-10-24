import mongoose from "mongoose";
import dotenv from "dotenv";
import Doctor from "./models/Doctor.js";
import fs from "fs";

dotenv.config();

// 1. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB connection error:", err));

// 2. Read the dataset
const doctorsData = JSON.parse(fs.readFileSync("./data/doctors.json", "utf-8"));

// 3. Seed function
const seedDoctors = async () => {
  try {
    // Optional: Clear existing doctors
    await Doctor.deleteMany();

    // Insert the doctors
    await Doctor.insertMany(doctorsData);

    console.log("Doctors data seeded successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDoctors();
