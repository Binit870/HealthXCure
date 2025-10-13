import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  city: String,
  education: String,
  institute: String,
  gender: String,
  address: String,
  lat: Number,
  lng: Number,
});

export default mongoose.model("Doctor", doctorSchema);
