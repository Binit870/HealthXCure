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
      className="w-full max-w-5xl mt-12 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] p-8 rounded-3xl shadow-2xl text-white border border-green-300"
    >
      <h2 className="text-3xl font-bold text-green-300 text-center mb-6">
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
              className="bg-[#1f2937] p-6 rounded-2xl shadow-lg flex justify-between items-center border border-gray-700"
            >
              <div>
                <h3 className="text-lg font-semibold text-green-300">
                  Plan from {new Date(planItem.createdAt).toLocaleDateString()}
                </h3>
                <p className="text-sm text-gray-300">
                  <strong>Age:</strong> {planItem.age || "N/A"} |{" "}
                  <strong>Gender:</strong> {planItem.gender || "N/A"} |{" "}
                  <strong>Height:</strong> {planItem.height ? `${planItem.height} cm` : "N/A"} |{" "}
                  <strong>Weight:</strong> {planItem.weight ? `${planItem.weight} kg` : "N/A"}
                </p>
                <p className="text-sm text-gray-300">
                  <strong>Goal:</strong> {planItem.goal || "N/A"} |{" "}
                  <strong>Diet:</strong> {planItem.dietType || "N/A"}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedPlan(planItem)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition-all"
                >
                  View
                </button>

                <button
                  onClick={() => handleDelete(planItem._id)}
                  className="text-red-400 hover:text-red-600 transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center text-green-300 mt-8">
          <p>You have no saved diet plans.</p>
        </div>
      )}

      <button
        onClick={handleBackToForm}
        className="w-full mt-8 bg-gradient-to-r from-green-500 to-cyan-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all hover:from-green-600 hover:to-cyan-600"
      >
        Go Back
      </button>
    </motion.div>
  );
};

export default DietHistory;
