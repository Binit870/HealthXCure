// src/components/FitnessHistory.jsx
import React from "react";
import { FaTrashAlt } from "react-icons/fa"; // 🗑️ Icon for delete
import API from "../../utils/Api";

const FitnessHistory = ({ history, fetchHistory }) => {
  if (history.length === 0) {
    return null;
  }

  const handleDelete = async (entryId) => {
    try {
      await API.delete(`/fitness/history/${entryId}`);
      console.log(`✅ Deleted entry: ${entryId}`);
      fetchHistory(); // Refresh the history list after deletion
    } catch (err) {
      console.error("❌ Error deleting fitness entry:", err);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-2 text-cyan-300">📊 Your Fitness History</h3>
      <ul className="space-y-2 max-h-48 overflow-y-auto">
        {history.map((entry, idx) => (
          <li
            key={idx}
            className="bg-gray-800 p-3 rounded-lg text-gray-300 text-sm flex justify-between items-center"
          >
            <span>
              BMI: {entry.bmi} ({entry.category})
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">
                {new Date(entry.createdAt).toLocaleDateString()}
              </span>
              <button
                onClick={() => handleDelete(entry._id)}
                className="text-red-400 hover:text-red-500 transition-colors"
                aria-label="Delete entry"
              >
                <FaTrashAlt />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FitnessHistory;