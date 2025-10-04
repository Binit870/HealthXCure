// src/components/FitnessResults.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const FitnessResults = ({ bmi, plan, tip }) => {
  return (
    <AnimatePresence>
      {bmi && (
        <motion.div
          key="results"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-700/70 rounded-xl p-6 border border-gray-600 shadow-inner"
        >
          <h2 className="text-xl font-bold text-center mb-2 text-cyan-300">
            Your BMI: {bmi.value}
          </h2>
          <p className="text-center text-gray-300 mb-2">
            Category:{" "}
            <span className="font-semibold text-blue-400">
              {bmi.category}
            </span>
          </p>
          <div className="w-full bg-gray-600 rounded-full h-3 mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((bmi.value / 40) * 100, 100)}%` }}
              transition={{ duration: 1 }}
              className="h-3 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300"
            ></motion.div>
          </div>
          <p className="text-sm text-gray-400 mb-4">{bmi.calories}</p>
          <ul className="space-y-3 mb-4">
            {plan.map((exercise, index) => (
              <li
                key={index}
                className="flex items-center space-x-3 bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition"
              >
                <span className="text-cyan-400 text-xl">{exercise.icon}</span>
                <span className="text-gray-200">{exercise.name}</span>
              </li>
            ))}
          </ul>
          {tip && (
            <div className="bg-gray-800 p-4 rounded-lg text-sm text-center text-gray-300 italic border border-gray-600">
              💡 {tip}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FitnessResults;