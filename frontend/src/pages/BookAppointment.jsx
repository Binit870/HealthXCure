import React, { useState } from "react";
import axios from "axios";

const BookAppointment = () => {
  const [city, setCity] = useState("mumbai");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDoctors = () => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/practice_search", { params: { city } })
      .then((res) => setDoctors(res.data.doctors || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl text-blue-700 font-bold text-center mb-6">
        Find Available Doctors
      </h2>
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border p-3 rounded-lg w-full md:w-1/3 shadow"
        >
          {["mumbai", "delhi", "bangalore", "kolkata", "chennai"].map((c) => (
            <option key={c} value={c}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
        <button
          onClick={fetchDoctors}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow"
        >
          Search
        </button>
      </div>

      {loading && (
        <p className="text-center text-lg text-gray-600">Loading doctors...</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doc) => (
          <div
            key={doc.uid || doc.practice_id}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4">
              <img
                src={doc.images?.[0]?.url || "https://via.placeholder.com/80"}
                alt="doctor"
                className="w-20 h-20 rounded-full border"
              />
              <div>
                <h3 className="font-bold text-xl text-gray-800">{doc.name}</h3>
                <p className="text-gray-600">
                  {doc.specialties?.[0]?.name || "General Physician"}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">
                Clinic: {doc.visit_address?.city || "N/A"}
              </p>
              <p className="text-sm text-gray-500">
                Contact: {doc.phones?.[0]?.number || "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookAppointment;
