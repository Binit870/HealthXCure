import React from "react";
import { motion } from "framer-motion";
import { cardVariants } from "./variants";
import MarkdownRenderer from "./MarkdownRenderer";
import { FaLeaf, FaHistory } from "react-icons/fa";

const DietPlanResult = ({
  plan,
  handleBackToForm,
  fetchHistory,
  handleBackToHistory,
  isHistoryView, // true if viewing from history
}) => {
  return (
    <motion.div
      key="plan"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="relative mt-8 sm:mt-12 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] p-6 sm:p-10 rounded-3xl shadow-2xl w-full max-w-5xl border border-green-300 overflow-hidden text-white"
    >
      {/* Decorative blobs */}
      <div className="absolute -top-10 -right-10 w-36 h-36 sm:w-48 sm:h-48 bg-green-400 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-10 -left-10 w-36 h-36 sm:w-48 sm:h-48 bg-cyan-400 rounded-full opacity-20 blur-3xl"></div>

      <div className="relative z-10">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 mb-4 text-center drop-shadow-lg"
        >
          ✨ Your Personalized Diet Plan
        </motion.h2>

        <p className="text-center text-gray-200 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base">
          Here is your custom diet plan, crafted just for you based on your needs!
        </p>

        {/* Profile Info - only show if NOT viewing from history */}
        {!isHistoryView && plan && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#1f2937] border border-green-300 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-md"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-green-300 mb-2">
              Your Profile Details
            </h3>
            <p className="text-gray-200 text-sm sm:text-base">
              <strong>Age:</strong> {plan.age || "N/A"} |{" "}
              <strong>Gender:</strong> {plan.gender || "N/A"} |{" "}
              <strong>Height:</strong> {plan.height ? `${plan.height} cm` : "N/A"} |{" "}
              <strong>Weight:</strong> {plan.weight ? `${plan.weight} kg` : "N/A"}
            </p>
            <p className="text-gray-200 text-sm sm:text-base mt-1">
              <strong>Goal:</strong> {plan.goal || "N/A"} |{" "}
              <strong>Diet Type:</strong> {plan.dietType || "N/A"}
            </p>
            {(plan.diseases || plan.symptoms) && (
              <p className="text-gray-200 text-sm sm:text-base mt-1">
                <strong>Health Notes:</strong>{" "}
                {plan.diseases ? `Diseases: ${plan.diseases}. ` : ""}
                {plan.symptoms ? `Symptoms: ${plan.symptoms}` : ""}
              </p>
            )}
          </motion.div>
        )}

        {/* Plan Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#1e3a8a] p-4 sm:p-6 md:p-8 rounded-2xl border border-gray-700 shadow-inner min-h-[350px] overflow-auto text-white"
        >
          {plan ? (
            <MarkdownRenderer content={typeof plan === "string" ? plan : plan.plan} />
          ) : (
            <p className="text-gray-400 text-sm sm:text-base">⚠️ No plan available</p>
          )}
        </motion.div>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mt-6 sm:mt-8 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleBackToForm}
            className="flex items-center justify-center gap-2 w-full md:w-1/2 bg-gradient-to-r from-green-500 to-cyan-500 text-white font-bold py-3 sm:py-4 rounded-full shadow-lg transition-all duration-300 ease-in-out text-sm sm:text-lg tracking-wide hover:from-green-600 hover:to-cyan-600"
          >
            <FaLeaf className="text-lg sm:text-xl" />
            Back to Form
          </motion.button>

          {isHistoryView ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleBackToHistory}
              className="flex items-center justify-center gap-2 w-full md:w-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 sm:py-4 rounded-full shadow-lg transition-all duration-300 ease-in-out text-sm sm:text-lg tracking-wide hover:from-purple-600 hover:to-pink-600"
            >
              <FaHistory className="text-lg sm:text-xl" />
              Back to History
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={fetchHistory}
              className="flex items-center justify-center gap-2 w-full md:w-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 sm:py-4 rounded-full shadow-lg transition-all duration-300 ease-in-out text-sm sm:text-lg tracking-wide hover:from-purple-600 hover:to-pink-600"
            >
              <FaHistory className="text-lg sm:text-xl" />
              View My History
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DietPlanResult;
