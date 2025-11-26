// src/components/FitnessHistory.jsx
import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import API from "../../utils/Api";
import { toast } from "react-toastify";

const FitnessHistory = ({ history, fetchHistory }) => {
  if (!history || history.length === 0) {
    return (
      <div className="py-6 text-center text-gray-500 text-sm sm:text-base md:text-lg font-medium">
        🚫 No history found
      </div>
    );
  }

  const handleDelete = async (entryId) => {
    try {
      await API.delete(`/fitness/history/${entryId}`);
      fetchHistory();
      toast.success("History deleted successfully.");
    } catch (err) {
      toast.error("Error deleting fitness entry.");
    }
  };

  return (
    <div className="mt-2 sm:mt-3">
      <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 text-teal-600 text-center sm:text-left">
        📊 Your Fitness History
      </h3>

      <ul className="space-y-2 sm:space-y-3 max-h-64 sm:max-h-72 md:max-h-96 overflow-y-auto pr-1 sm:pr-2">
        {history.map((entry, idx) => (
          <li
            key={entry._id || idx}
            className="bg-white p-3 sm:p-4 rounded-xl border border-gray-200 text-gray-700 
                       text-xs sm:text-sm md:text-base flex items-center justify-between
                       shadow-sm hover:bg-teal-50 transition-colors"
          >
            {/* Left: BMI + date */}
            <div className="flex flex-col mr-3 min-w-0">
              <div className="font-medium flex items-center flex-wrap gap-1">
                BMI:{" "}
                <span className="text-teal-600 font-bold">{entry.bmi}</span>
                <span className="text-[10px] sm:text-xs md:text-sm text-gray-500">
                  ({entry.category})
                </span>
              </div>

              <div className="text-[10px] sm:text-xs md:text-sm text-gray-500 mt-1 break-words">
                {entry.plan ? `${entry.plan.main_workout?.length || 0} exercises • ` : ""}
                {new Date(entry.createdAt).toLocaleString()}
              </div>
            </div>

            {/* Right: Buttons stay aligned on same row */}
            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              <button
                onClick={() => entry.onView && entry.onView(entry)}
                className="text-blue-600 hover:text-blue-800 font-semibold 
                           text-[10px] sm:text-xs md:text-sm px-2 py-1 
                           hover:bg-blue-50 rounded transition-colors"
              >
                View
              </button>

              <button
                onClick={() => handleDelete(entry._id)}
                className="text-red-500 hover:text-red-700 transition-colors 
                           p-1.5 sm:p-2 md:p-2.5 hover:bg-red-50 rounded"
                aria-label="Delete entry"
              >
                <FaTrashAlt className="text-xs sm:text-sm md:text-base" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FitnessHistory;
