// src/components/DigitalHealthRecords.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const DigitalHealthRecords = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const records = [
    {
      name: "John Doe",
      dob: "1990-05-14",
      bloodGroup: "A+",
      allergies: ["Penicillin", "Peanuts"],
      conditions: ["Diabetes"],
      medications: ["Metformin 500mg"],
      reports: [
        { title: "Blood Test", date: "2025-01-12", summary: "Normal" },
        { title: "X-Ray Chest", date: "2025-02-10", summary: "No Issues" },
      ],
    },
    {
      name: "Jane Smith",
      dob: "1985-08-20",
      bloodGroup: "B-",
      allergies: ["Sulfa Drugs"],
      conditions: ["Hypertension"],
      medications: ["Amlodipine 10mg"],
      reports: [
        { title: "MRI Brain", date: "2025-03-05", summary: "Normal" },
        { title: "ECG", date: "2025-04-01", summary: "Normal" },
      ],
    },
    // Add more records as needed
  ];

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <h2 className="text-4xl font-bold text-center text-indigo-800 mb-10">
        Digital Health Records
      </h2>

      <div className="max-w-5xl mx-auto space-y-6">
        {records.map((record, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="border border-gray-300 rounded-3xl p-6 cursor-pointer shadow hover:shadow-lg transition"
            onClick={() => handleToggle(idx)}
          >
            {/* Summary */}
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">{record.name}</h3>
                <p className="text-gray-600">{record.dob}</p>
              </div>
              <span className="text-indigo-600 font-bold">
                {expandedIndex === idx ? "▲" : "▼"}
              </span>
            </div>

            {/* Expanded Details */}
            {expandedIndex === idx && (
              <div className="mt-4 space-y-2 max-h-80 overflow-y-auto pr-2">
                <p><strong>Blood Group:</strong> {record.bloodGroup}</p>
                <p><strong>Allergies:</strong> {record.allergies.join(", ")}</p>
                <p><strong>Conditions:</strong> {record.conditions.join(", ")}</p>
                <p><strong>Medications:</strong> {record.medications.join(", ")}</p>
                <div>
                  <strong>Reports:</strong>
                  <ul className="list-disc list-inside">
                    {record.reports.map((r, i) => (
                      <li key={i}>
                        {r.title} ({r.date}) - {r.summary}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DigitalHealthRecords;
