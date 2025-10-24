import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: String,

  phone: String,
  city: String,
  state: String,

  gender: String,
  address: String,
  specialization: String,
  lat: Number,
  lng: Number,
});

export default mongoose.model("Doctor", doctorSchema);
