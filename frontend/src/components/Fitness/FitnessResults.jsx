import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const FitnessResults = ({ bmi, plan, tip }) => {
  if (!bmi) return null;

  // 💡 NEW FUNCTIONALITY: Goal Calculation Logic
  const calculateGoalTime = () => {
    if (!bmi.targetWeight) return null;

    const currentWeight = parseFloat(bmi.value) > 0 ? parseFloat(bmi.value) / (parseFloat(bmi.value) * parseFloat(bmi.value)) : 0; // Simplified placeholder
    const weightDiff = Math.abs(parseFloat(bmi.targetWeight) - currentWeight);
    const direction = parseFloat(bmi.targetWeight) > currentWeight ? "gain" : "lose";

    // Rough Estimate: Assuming 0.5 kg loss/gain per week on average for a moderate plan.
    const weeks = Math.ceil(weightDiff / 0.5); 
    const months = Math.ceil(weeks / 4.3);
    
    // Safety check for invalid calculation
    if (isNaN(weeks) || weeks === Infinity || weightDiff === 0) return null;

    return { weeks, months, direction };
  };

  const goalTime = calculateGoalTime();
  const goalMessage = goalTime 
    ? `🎯 Estimated time to ${goalTime.direction} ${Math.abs(parseFloat(bmi.targetWeight) - parseFloat(bmi.value)).toFixed(1)}kg: **${goalTime.months} months**`
    : null;
  // END NEW FUNCTIONALITY

  return (
    <AnimatePresence>
      {bmi && (
        <motion.div
          key="results"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          // Simple white box with subtle shadow/border
          className="bg-white rounded-xl p-6 border border-teal-200 shadow-lg mt-6"
        >
          <h2 className="text-xl font-bold text-center mb-2 text-teal-600">
            Your BMI: {bmi.value}
          </h2>
          <p className="text-center text-gray-600 mb-2">
            Category:{" "}
            <span className={`font-semibold ${bmi.category === 'Normal' ? 'text-green-600' : 'text-orange-600'}`}>
              {bmi.category}
            </span>
          </p>
          
          {/* BMI Progress Bar (Teal gradient) */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((bmi.value / 40) * 100, 100)}%` }}
              transition={{ duration: 1 }}
              className="h-3 rounded-full bg-gradient-to-r from-teal-400 to-teal-600"
            ></motion.div>
          </div>

          {/* New Goal Message */}
          {goalTime && (
            <p className="text-sm text-center text-gray-700 bg-teal-50 p-2 rounded mb-4">
              {goalMessage.replace(/\*\*/g, ' **')} 
            </p>
          )}

          <h3 className="text-lg font-semibold text-teal-500 mb-3 border-t border-gray-200 pt-3">
            Your Personalized Plan
          </h3>
          <p className="text-sm text-gray-500 mb-3">{bmi.finalRecommendation}</p>
          <p className="text-sm text-gray-600 mb-4 font-medium">{bmi.calories}</p>


          {/* Exercise List */}
          <ul className="space-y-3 mb-4">
            {plan.map((exercise, index) => (
              <li
                key={index}
                // Light background, teal accents
                className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg border border-gray-200 hover:bg-teal-50 transition"
              >
                <span className="text-teal-500 text-xl">{exercise.icon}</span>
                <span className="text-gray-700">{exercise.name}</span>
              </li>
            ))}
          </ul>
          
          {/* Tip of the Day */}
          {tip && (
            <div className="bg-teal-50 p-4 rounded-lg text-sm text-center text-gray-700 italic border border-teal-200">
              💡 {tip}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FitnessResults;