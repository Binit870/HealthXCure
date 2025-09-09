// src/components/DietHistory.jsx
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
            className="w-full max-w-4xl"
        >
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Your Diet History</h2>
            {loading ? (
                <div className="flex justify-center items-center h-48">
                    <FaSpinner className="animate-spin text-4xl text-green-500" />
                </div>
            ) : history.length > 0 ? (
                <div className="space-y-4">
                    {history.map((planItem, index) => (
                        <motion.div
                            key={planItem._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white p-6 rounded-2xl shadow-lg flex justify-between items-center"
                        >
                            <div>
                                <h3 className="text-lg font-semibold">
                                    Plan from {new Date(planItem.createdAt).toLocaleDateString()}
                                </h3>
                                {/* You can add more details here if your backend returns them, e.g., planItem.goal */}
                            </div>
                            <div className="flex gap-2">
                                <button
  onClick={() => {
    console.log("Clicked plan:", planItem);
    setSelectedPlan(planItem);
  }}
  className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition-all"
>
  View
</button>


                                <button
                                    onClick={() => handleDelete(planItem._id)}
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-600 mt-8">
                    <p>You have no saved diet plans.</p>
                </div>
            )}
            <button
                onClick={handleBackToForm}
                className="w-full mt-8 bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all"
            >
                Go Back
            </button>
        </motion.div>
    );
};

export default DietHistory;