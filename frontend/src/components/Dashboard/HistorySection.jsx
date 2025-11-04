import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HistorySection = ({ title, icon: Icon, historyData = [], emptyMessage, showViewAll }) => {
  const navigate = useNavigate();

  const handleViewAll = () => {
    if (title === "Diet History") navigate("/diet-planner");
    else if (title === "Symptom History") navigate("/symptom-checker");
    else if (title === "Report History") navigate("/reports");
  };

  // ✅ Navigate to detailed view pages
  const handleViewItem = (item) => {
    if (title === "Diet History") {
      navigate(`/diet-planner`, { state: { diet: item } });
    } else if (title === "Symptom History") {
      navigate(`/symptom-checker`, { state: { symptom: item } });
    } else if (title === "Report History") {
      navigate(`/reports`, { state: { report: item } });
    }
  };

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString() : "Unknown Date";

  return (
    <div className="rounded-3xl p-8 shadow-lg bg-white border border-lavender-100 transition-shadow duration-300 hover:shadow-xl text-left">
      <h4 className="text-2xl font-bold mb-6 text-teal-700 flex items-center">
        <Icon className="mr-4 text-3xl text-teal-500" /> {title}
      </h4>

      {Array.isArray(historyData) && historyData.length > 0 ? (
        <ul className="space-y-4 text-gray-800">
          {historyData.map((item, index) => (
            <li
              key={index}
              className="border-t border-gray-200 pt-4 flex justify-between items-center hover:bg-lavender-50/50 p-3 rounded-xl transition-colors duration-200"
            >
              <div>
                <p className="text-gray-700 font-medium">{formatDate(item.createdAt)}</p>

                {/* 🥗 Diet history preview */}
                {title === "Diet History" && (
                  <p className="text-sm text-gray-500">
                    Type: {item.dietType || "Not specified"} | Goal: {item.goal}
                  </p>
                )}

                {/* 🤒 Symptom history preview */}
                {title === "Symptom History" && (
                  <p className="text-sm text-gray-500">
                    Symptom: {item.symptoms?.[0] || "N/A"} | Gender: {item.gender}
                  </p>
                )}

                {/* 📄 Report history preview */}
                {title === "Report History" && (
                  <p className="text-sm text-gray-500">
                    File: {item.name || item.fileName || "Unnamed report"}
                  </p>
                )}
              </div>

              <button
                onClick={() => handleViewItem(item)}
                className="text-white bg-teal-500 hover:bg-teal-600 px-4 py-1.5 rounded-full text-sm font-semibold transition-all"
              >
                View
              </button>
            </li>
          ))}

          {showViewAll && (
            <li className="pt-4 text-center">
              <button
                onClick={handleViewAll}
                className="text-teal-500 hover:text-teal-700 font-semibold flex items-center justify-center mx-auto transition-colors duration-200"
              >
                View All {title.replace(" History", "")}
                <FaArrowRight className="ml-2 text-sm" />
              </button>
            </li>
          )}
        </ul>
      ) : (
        <p className="text-gray-500 text-lg">{emptyMessage}</p>
      )}
    </div>
  );
};

export default HistorySection;
