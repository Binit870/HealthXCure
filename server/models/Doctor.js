import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({

  name: String, 
  specialization: String,
  experience: Number, 
  phone: String,
  city: String,
  state: String, 
  gender: String,
  address: String,
  lat: Number,
  lng: Number,
  
});

export default mongoose.model("Doctor", doctorSchema);