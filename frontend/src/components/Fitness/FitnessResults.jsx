// src/components/FitnessResults.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFire, FaDumbbell, FaHeart, FaSnowflake } from "react-icons/fa";

const ExerciseList = ({ title, icon, exercises }) => (
  <div className="mb-3 sm:mb-4">
    <h4 className="text-xs sm:text-sm md:text-base font-bold text-teal-700 mb-2 flex items-center">
      {icon} &nbsp;{title}
    </h4>
    <ul className="space-y-2">
      {exercises.map((exercise, index) => (
        <li
          key={index}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-2.5 sm:p-3 md:p-4 rounded-lg border border-gray-100 shadow-sm text-gray-700 text-xs sm:text-sm md:text-base"
        >
          <span className="font-medium mb-1.5 sm:mb-0">{exercise.name}</span>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[10px] sm:text-xs md:text-sm font-semibold text-gray-500">
            {exercise.sets && <span>{exercise.sets} Sets</span>}
            {exercise.reps_or_duration && <span>{exercise.reps_or_duration}</span>}
            {exercise.duration_seconds && <span>{exercise.duration_seconds}s</span>}
            {exercise.rest_seconds && (
              <span className="text-orange-500">Rest: {exercise.rest_seconds}s</span>
            )}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const FitnessResults = ({ bmi, plan, tip }) => {
  if (!bmi || !plan) return null;

  const calculateGoalTime = () => {
    if (!bmi.targetWeight) return null;
    const currentWeight = parseFloat(bmi.weight || "0");
    const target = parseFloat(bmi.targetWeight);
    if (isNaN(currentWeight) || isNaN(target)) return null;
    const weightDiffRaw = Math.abs(target - currentWeight);
    if (weightDiffRaw === 0) return null;
    const weeks = Math.ceil(weightDiffRaw / 0.5); // assume 0.5kg per week
    const months = Math.ceil(weeks / 4.3);
    const direction = target > currentWeight ? "gain" : "lose";
    return { weeks, months, direction, weightDiff: weightDiffRaw.toFixed(1) };
  };

  const goalTime = calculateGoalTime();

  return (
    <AnimatePresence>
      {bmi && (
        <motion.div
          key="results"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.35 }}
          className="bg-white rounded-xl p-3 sm:p-4 md:p-6 border border-teal-200 shadow-lg mt-4 sm:mt-6 w-full mx-auto"
        >
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-center mb-1.5 sm:mb-2 text-teal-600">
            Your BMI: {bmi.value}
          </h2>
          <p className="text-center text-gray-600 mb-2 text-xs sm:text-sm md:text-base">
            Category:{" "}
            <span className={`font-semibold ${bmi.category === "Normal" ? "text-green-600" : "text-orange-600"}`}>
              {bmi.category}
            </span>
          </p>

          {/* BMI Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 sm:h-3 mb-3 sm:mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((Number(bmi.value) / 40) * 100, 100)}%` }}
              transition={{ duration: 0.8 }}
              className="h-2.5 sm:h-3 rounded-full bg-gradient-to-r from-teal-400 to-teal-600"
            ></motion.div>
          </div>

          {/* Goal Message */}
          {goalTime && (
            <p className="text-[10px] sm:text-xs md:text-sm text-center text-gray-700 bg-teal-50 p-2 sm:p-2.5 rounded mb-3 sm:mb-4">
              🎯 Estimated time to {goalTime.direction} {goalTime.weightDiff}kg: <strong>{goalTime.months} months</strong>
            </p>
          )}

          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-teal-500 mb-2 sm:mb-3 border-t border-gray-200 pt-2 sm:pt-3">
            Your Personalized Daily Plan ({bmi.weeklyGoal?.split(" (")[1]?.replace(")", "") || "---"})
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 font-medium">{bmi.calories}</p>

          {/* Exercise Sections - responsive grid for large screens */}
          <div className="space-y-3 sm:space-y-4">
            {plan.warmup?.length > 0 && (
              <ExerciseList title="Warm-up" icon={<FaFire />} exercises={plan.warmup} />
            )}

            {plan.main_workout?.length > 0 && (
              <ExerciseList title="Main Workout Routine" icon={<FaDumbbell />} exercises={plan.main_workout} />
            )}

            {plan.cooldown?.length > 0 && (
              <ExerciseList title="Cool-down & Stretch" icon={<FaSnowflake />} exercises={plan.cooldown} />
            )}

            {plan.preferred?.length > 0 && (
              <ExerciseList title="Recommended Based on Your Preferences" icon={<FaHeart />} exercises={plan.preferred} />
            )}
          </div>

          {/* Tip of the Day */}
          {tip && (
            <div className="bg-teal-50 p-3 sm:p-4 rounded-lg text-[10px] sm:text-xs md:text-sm text-center text-gray-700 italic border border-teal-200 mt-3 sm:mt-4">
              💡 {tip}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FitnessResults;