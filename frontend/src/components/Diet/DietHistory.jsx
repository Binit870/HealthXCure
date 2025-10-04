import React from "react";
import { motion } from "framer-motion";
import { FaTrash, FaSpinner } from "react-icons/fa";
import { cardVariants } from "./variants";

const DietHistory = ({ history, loading, handleDelete, handleBackToForm, setSelectedPlan }) => {
  return (
    <motion.div
      key="history-view"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full max-w-5xl mt-8 sm:mt-12 px-4 sm:px-6 md:px-8 py-6 sm:py-8 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] rounded-3xl shadow-2xl text-white border border-green-300"
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-green-300 text-center mb-6">
        Your Diet History
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <FaSpinner className="animate-spin text-4xl text-green-400" />
        </div>
      ) : history.length > 0 ? (
        <div className="space-y-4">
          {history.map((planItem, index) => (
            <motion.div
              key={planItem._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#1f2937] p-4 sm:p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row sm:justify-between items-start sm:items-center border border-gray-700"
            >
              <div className="flex-1 w-full sm:w-auto mb-4 sm:mb-0">
                <h3 className="text-lg sm:text-xl font-semibold text-green-300">
                  Plan from {new Date(planItem.createdAt).toLocaleDateString()}
                </h3>
                <p className="text-sm sm:text-base text-gray-300 mt-1">
                  <strong>Age:</strong> {planItem.age || "N/A"} |{" "}
                  <strong>Gender:</strong> {planItem.gender || "N/A"} |{" "}
                  <strong>Height:</strong> {planItem.height ? `${planItem.height} cm` : "N/A"} |{" "}
                  <strong>Weight:</strong> {planItem.weight ? `${planItem.weight} kg` : "N/A"}
                </p>
                <p className="text-sm sm:text-base text-gray-300 mt-1">
                  <strong>Goal:</strong> {planItem.goal || "N/A"} |{" "}
                  <strong>Diet:</strong> {planItem.dietType || "N/A"}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
  <button
    onClick={() => setSelectedPlan(planItem)}
    className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition-all text-sm sm:text-base"
  >
    View
  </button>

  <button
    onClick={() => handleDelete(planItem._id)}
    className="w-full sm:w-auto px-4 py-2 text-red-400 hover:text-red-600 transition-colors text-sm sm:text-base flex justify-center items-center border border-red-400 rounded-lg"
  >
    <FaTrash />
  </button>
</div>

            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center text-green-300 mt-8 text-sm sm:text-base">
          <p>You have no saved diet plans.</p>
        </div>
      )}

      <button
        onClick={handleBackToForm}
        className="w-full mt-6 sm:mt-8 bg-gradient-to-r from-green-500 to-cyan-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all hover:from-green-600 hover:to-cyan-600 text-sm sm:text-base"
      >
        Go Back
      </button>
    </motion.div>
  );
};

export default DietHistory;
