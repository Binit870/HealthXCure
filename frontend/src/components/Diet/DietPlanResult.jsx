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
  isHistoryView,
}) => {
  return (
    <motion.div
      key="plan"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="relative mt-12 bg-white p-10 rounded-3xl shadow-2xl w-full max-w-5xl border border-green-200 overflow-hidden"
    >
      {/* Decorative gradient blobs */}
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-green-200 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-200 rounded-full opacity-30 blur-3xl"></div>

      <div className="relative z-10">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500 mb-4 text-center drop-shadow-lg"
        >
          ✨ Your Personalized Diet Plan
        </motion.h2>

        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Here is your custom diet plan, crafted just for you based on your
          needs!
        </p>

        {/* Plan Card */}
       {/* Plan Card */}
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6 }}
  className="bg-gradient-to-br from-green-50 via-white to-blue-50 p-6 md:p-8 rounded-2xl border border-gray-200 shadow-inner mb-8 min-h-[350px] overflow-auto"
>
  {plan ? (
    <MarkdownRenderer content={typeof plan === "string" ? plan : plan.plan} />
  ) : (
    <p className="text-gray-500">⚠️ No plan available</p>
  )}
</motion.div>


        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleBackToForm}
            className="flex items-center justify-center gap-2 w-full md:w-1/2 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-4 rounded-full shadow-lg transition-all duration-300 ease-in-out text-lg tracking-wide hover:from-green-600 hover:to-blue-600"
          >
            <FaLeaf className="text-xl" />
            Back to Form
          </motion.button>

          {isHistoryView ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleBackToHistory}
              className="flex items-center justify-center gap-2 w-full md:w-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-full shadow-lg transition-all duration-300 ease-in-out text-lg tracking-wide hover:from-purple-600 hover:to-pink-600"
            >
              <FaHistory className="text-xl" />
              Back to History
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={fetchHistory}
              className="flex items-center justify-center gap-2 w-full md:w-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-full shadow-lg transition-all duration-300 ease-in-out text-lg tracking-wide hover:from-purple-600 hover:to-pink-600"
            >
              <FaHistory className="text-xl" />
              View My History
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DietPlanResult;
