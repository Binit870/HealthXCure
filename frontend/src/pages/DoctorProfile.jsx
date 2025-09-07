// src/pages/DoctorProfile.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

// Reuse the same doctors array (or move it to a separate file for shared data)
const doctors = Array.from({ length: 20 }).map((_, i) => ({
  name: `Dr. Doctor ${i + 1}`,
  specialty: i % 5 === 0 ? "Cardiologist" : i % 5 === 1 ? "Dietitian" : i % 5 === 2 ? "General Physician" : i % 5 === 3 ? "Dermatologist" : "Neurologist",
  rating: Math.floor(Math.random() * 2) + 4,
  location: `City ${i + 1}`,
  image: `https://randomuser.me/api/portraits/${i % 2 === 0 ? "men" : "women"}/${i + 10}.jpg`,
}));

const DoctorProfile = () => {
  const { id } = useParams();
  const doctor = doctors[id];

  if (!doctor) return <p className="text-center mt-20 text-red-500">Doctor not found</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-indigo-50 py-12 px-6">
      <img src={doctor.image} alt={doctor.name} className="w-40 h-40 rounded-full mb-6 object-cover shadow-lg" />
      <h1 className="text-3xl font-bold text-indigo-900 mb-2">{doctor.name}</h1>
      <p className="text-xl text-gray-700 mb-2">Specialty: {doctor.specialty}</p>
      <p className="text-gray-600 mb-2">
        Rating:{" "}
        {Array.from({ length: 5 }).map((_, i) => (
          <FaStar key={i} className={`inline mr-1 ${i < doctor.rating ? "text-yellow-400" : "text-gray-300"}`} />
        ))}
      </p>
      <p className="text-gray-600 mb-2">Location: {doctor.location}</p>
      <p className="text-gray-600 mb-6">Doctor ID: {id}</p>
      <Link to="/about" className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition">
  Back to About
</Link>

    </div>
  );
};

export default DoctorProfile;
