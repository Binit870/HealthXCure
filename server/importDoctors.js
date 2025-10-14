import xlsx from "xlsx";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Doctor from "./models/Doctor.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config(); // Load .env file

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Mongo connection error:", err));

const importDoctors = async () => {
  try {
    // ✅ Read the Excel file (make sure the file is in the same folder)
    const workbook = xlsx.readFile(path.join(__dirname, "./477153393-doctors-data-xls.xls"));
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rawDoctors = xlsx.utils.sheet_to_json(sheet);

    console.log("🧾 Sample Row:", rawDoctors[0]);
    console.log(`📄 Found ${rawDoctors.length} records in Excel file`);

    // ✅ Transform Excel data into clean doctor objects
    const formattedDoctors = rawDoctors.map((d) => ({
      name: d["Name"] || "",
      email: d["Email Id"] || "",
      phone: d["Mobile No."] || "",
      city: d["Current Location"] || "",
      education: d["Course(Highest Education)"] || "",
      institute: d["Institute(Highest Education)"] || "",
      gender: d["Gender"] || "",
      address: d["Address"] || "",
    }));

    // ✅ Clear existing records (optional)
    await Doctor.deleteMany({});
    console.log("🧹 Old records removed");

    // ✅ Insert new records
    await Doctor.insertMany(formattedDoctors);
    console.log("✅ Doctors imported successfully!");

  } catch (error) {
    console.error("❌ Error importing data:", error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the import
importDoctors();
