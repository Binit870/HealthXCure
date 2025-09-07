// src/pages/About.jsx
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaStethoscope, FaUserMd, FaNotesMedical, FaRobot, FaUtensils, FaShieldAlt, FaStar } from "react-icons/fa";

const About = () => {
  const [showDoctors, setShowDoctors] = useState(false);
  const [showRecords, setShowRecords] = useState(false);
  const [expandedRecordIndex, setExpandedRecordIndex] = useState(null);

  const doctorsRef = useRef(null);
  const recordsRef = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.2 } },
  };

  const itemVariants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
  const featureVariants = { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } } };

  const features = [
    { id: 1, icon: FaStethoscope, title: "Symptom Checker & Diagnosis", description: "Get an instant, AI-powered preliminary diagnosis by entering your symptoms.", color: "text-indigo-500" },
    { id: 2, icon: FaUserMd, title: "Find Doctors", description: "Easily find certified doctors in your area.", color: "text-pink-500" },
    { id: 3, icon: FaNotesMedical, title: "Digital Health Records", description: "Securely store and manage your medical reports.", color: "text-green-500" },
    { id: 4, icon: FaRobot, title: "AI Health Assistant", description: "Chat with our AI assistant for instant answers.", color: "text-indigo-500" },
    { id: 5, icon: FaUtensils, title: "Personalized Diet Planner", description: "Get a custom diet plan based on your health goals.", color: "text-yellow-500" },
    { id: 6, icon: FaShieldAlt, title: "Data Security", description: "Your personal health data is always secure.", color: "text-blue-500" },
  ];

  const doctors = Array.from({ length: 20 }).map((_, i) => ({
    name: `Dr. Doctor ${i + 1}`,
    specialty: i % 5 === 0 ? "Cardiologist" : i % 5 === 1 ? "Dietitian" : i % 5 === 2 ? "General Physician" : i % 5 === 3 ? "Dermatologist" : "Neurologist",
    rating: Math.floor(Math.random() * 2) + 4,
    location: `City ${i + 1}`,
    image: `https://randomuser.me/api/portraits/${i % 2 === 0 ? "men" : "women"}/${i + 10}.jpg`,
  }));

  const records = [
    { name: "Aman Patra", dob: "1990-05-14", bloodGroup: "A+", allergies: ["Penicillin", "Peanuts"], conditions: ["Diabetes"], medications: ["Metformin 500mg"], reports: [{ title: "Blood Test", date: "2025-01-12", summary: "Normal" }, { title: "X-Ray Chest", date: "2025-02-10", summary: "No Issues" }] },
    { name: "Rajad Kumar", dob: "1985-08-20", bloodGroup: "B-", allergies: ["Sulfa Drugs"], conditions: ["Hypertension"], medications: ["Amlodipine 10mg"], reports: [{ title: "MRI Brain", date: "2025-03-05", summary: "Normal" }, { title: "ECG", date: "2025-04-01", summary: "Normal" }] },
    { name: "Sumant kumar", dob: "1978-11-12", bloodGroup: "O+", allergies: ["Dust"], conditions: ["Asthma"], medications: ["Inhaler 2x/day"], reports: [{ title: "Spirometry Test", date: "2025-05-15", summary: "Mild obstruction" }, { title: "Chest X-Ray", date: "2025-06-01", summary: "Clear" }] },
    { name: "Rohit Kumar", dob: "1992-02-28", bloodGroup: "AB+", allergies: ["Seafood"], conditions: ["Anemia"], medications: ["Iron Supplements"], reports: [{ title: "CBC", date: "2025-07-10", summary: "Low hemoglobin" }, { title: "Vitamin B12 Test", date: "2025-07-15", summary: "Normal" }] },
    { name: "Amarjeet kumar", dob: "1988-09-05", bloodGroup: "A-", allergies: ["Latex"], conditions: ["Hypertension"], medications: ["Losartan 50mg"], reports: [{ title: "Blood Pressure Report", date: "2025-08-12", summary: "Controlled" }, { title: "Kidney Function Test", date: "2025-08-20", summary: "Normal" }] },
    { name: "Chandan Singh", dob: "1995-12-17", bloodGroup: "B+", allergies: ["None"], conditions: ["Migraines"], medications: ["Ibuprofen as needed"], reports: [{ title: "MRI Brain", date: "2025-09-05", summary: "Normal" }, { title: "EEG", date: "2025-09-10", summary: "Normal" }] },
  ];

  // Toggle: only one section open at a time
  const handleFeatureClick = (title) => {
    if (title === "Find Doctors") {
      setShowDoctors((prev) => {
        const newState = !prev;
        if (newState) setShowRecords(false);
        return newState;
      });
      setExpandedRecordIndex(null); // close expanded record
      setTimeout(() => doctorsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } else if (title === "Digital Health Records") {
      setShowRecords((prev) => {
        const newState = !prev;
        if (newState) setShowDoctors(false);
        return newState;
      });
      setExpandedRecordIndex(null); // close expanded record
      setTimeout(() => recordsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  };

  const handleRecordToggle = (index) => {
    setExpandedRecordIndex(expandedRecordIndex === index ? null : index);
  };

  return (
    <div className="bg-white text-gray-800 font-sans pt-24 pb-12">
      <motion.div className="container mx-auto px-6 max-w-7xl" variants={containerVariants} initial="hidden" animate="visible">

        {/* Hero */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h1 className="text-5xl md:text-6xl font-extrabold text-black mb-4 drop-shadow-md">Your Partner in Health and Wellness</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-700">
            At HealthCure, we believe that health is a journey, not a destination. We're here to empower you with innovative tools and compassionate support.
          </p>
        </motion.div>

        <motion.hr variants={itemVariants} className="my-12 border-t-2 border-gray-300" />

        {/* Features */}
        <motion.div className="mb-16" variants={itemVariants}>
          <h2 className="text-4xl font-bold text-center text-black mb-10">What We Offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center text-center cursor-pointer hover:scale-105 transition-transform"
                variants={featureVariants}
                onClick={() => handleFeatureClick(feature.title)}
              >
                <feature.icon className={`text-5xl mb-4 ${feature.color}`} />
                <h3 className="text-xl font-bold mb-2 text-black">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Doctors Section */}
        {showDoctors && (
          <motion.div className="mb-16" ref={doctorsRef} variants={containerVariants} initial="hidden" animate="visible">
            <h2 className="text-4xl font-bold text-center text-black mb-10">Meet Our Doctors</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {doctors.map((doc, idx) => (
                <div key={idx} className="bg-white shadow-lg rounded-3xl p-6 text-center">
                  <img src={doc.image} alt={doc.name} className="w-24 h-24 rounded-full mb-4 object-cover mx-auto" />
                  <h3 className="text-xl font-bold mb-1 text-black">{doc.name}</h3>
                  <p className="text-gray-700 mb-1">{doc.specialty}</p>
                  <div className="flex justify-center mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar key={i} className={`mr-1 ${i < doc.rating ? "text-yellow-400" : "text-gray-300"}`} />
                    ))}
                  </div>
                  <p className="text-gray-700">{doc.location}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Digital Health Records Section */}
        {showRecords && (
          <motion.div className="mb-16" ref={recordsRef} variants={containerVariants} initial="hidden" animate="visible">
            <h2 className="text-4xl font-bold text-center text-black mb-10">Digital Health Records</h2>
            <div className="max-w-5xl mx-auto space-y-6">
              {records.map((record, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="border border-gray-300 rounded-3xl p-6 cursor-pointer shadow hover:shadow-lg transition"
                  onClick={() => handleRecordToggle(idx)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold">{record.name}</h3>
                      <p className="text-gray-600">{record.dob}</p>
                    </div>
                    <span className="text-indigo-600 font-bold">{expandedRecordIndex === idx ? "▲" : "▼"}</span>
                  </div>

                  {expandedRecordIndex === idx && (
                    <div className="mt-4 space-y-2 max-h-80 overflow-y-auto pr-2">
                      <p><strong>Blood Group:</strong> {record.bloodGroup}</p>
                      <p><strong>Allergies:</strong> {record.allergies.join(", ")}</p>
                      <p><strong>Conditions:</strong> {record.conditions.join(", ")}</p>
                      <p><strong>Medications:</strong> {record.medications.join(", ")}</p>
                      <div>
                        <strong>Reports:</strong>
                        <ul className="list-disc list-inside">
                          {record.reports.map((r, i) => (
                            <li key={i}>{r.title} ({r.date}) - {r.summary}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

      </motion.div>
    </div>
  );
};

export default About;
