import React from "react";
import { motion } from "framer-motion";

const ambulances = [
  { name: "City Ambulance Service", location: "Ranchi", phone: "123-456-7890" },
  { name: "Rapid Response Ambulance", location: "Jamshedpur", phone: "987-654-3210" },
  { name: "24/7 Emergency Ambulance", location: "Bistupur", phone: "555-123-4567" },
];

const AmbulanceList = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-white mb-10">Ambulance List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {ambulances.map((ambulance, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 hover:scale-105 transition-transform"
          >
            <h3 className="text-xl font-extrabold text-gray-900">{ambulance.name}</h3>
            <p className="text-gray-700"><strong>Location:</strong> {ambulance.location}</p>
            <p className="text-gray-700"><strong>Contact:</strong> {ambulance.phone}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AmbulanceList;
