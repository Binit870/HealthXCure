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
    <div className="mt-8 pt-4 border-t border-gray-200">
      <h3 className="text-lg font-bold mb-3 text-teal-600">📊 Your Fitness History</h3>
      {/* History List Container */}
      <ul className="space-y-3 max-h-56 overflow-y-auto pr-2"> 
        {history.map((entry, idx) => (
          <li
            key={idx}
            // Simple white/teal list item styling
            className="bg-white p-3 rounded-xl border border-gray-200 text-gray-700 text-sm flex justify-between items-center shadow-sm hover:bg-teal-50 transition-colors"
          >
            <span className="font-medium">
              BMI: <span className="text-teal-600 font-bold">{entry.bmi}</span> ({entry.category})
               {/* Display the complexity of the saved plan */}
               <span className="ml-2 text-xs text-teal-400">({entry.plan?.main_workout?.length || 0} exercises)</span>
            </span>
            <div className="flex items-center space-x-3">
              <span className="text-gray-500 text-xs">
                {new Date(entry.createdAt).toLocaleDateString()}
              </span>
              <button
                onClick={() => handleDelete(entry._id)}
                className="text-red-500 hover:text-red-700 transition-colors"
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