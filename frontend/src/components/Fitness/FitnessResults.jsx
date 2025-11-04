// src/components/FitnessResults.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFire, FaClock, FaHeart, FaSnowflake } from "react-icons/fa";

// Helper function to render a list of exercises with details
const ExerciseList = ({ title, icon, exercises }) => (
    <div className="mb-4">
        <h4 className="text-md font-bold text-teal-700 mb-2 flex items-center">
            {icon} &nbsp;{title}
        </h4>
        <ul className="space-y-2">
            {exercises.map((exercise, index) => (
                <li
                    key={index}
                    className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-100 shadow-sm text-gray-700 text-sm"
                >
                    <span className="font-medium">{exercise.name}</span>
                    <div className="flex space-x-2 text-xs font-semibold text-gray-500">
                        {exercise.sets && <span>{exercise.sets} Sets</span>}
                        {exercise.reps_or_duration && <span>{exercise.reps_or_duration}</span>}
                        {exercise.duration_seconds && <span>{exercise.duration_seconds}s</span>}
                        {exercise.rest_seconds && <span className="text-orange-500">Rest: {exercise.rest_seconds}s</span>}
                    </div>
                </li>
            ))}
        </ul>
    </div>
);

const FitnessResults = ({ bmi, plan, tip }) => {
  if (!bmi || !plan) return null;

  // 💡 NOTE: The calculateGoalTime logic needs the actual current weight, not BMI value,
   // but we'll use a placeholder since the weight isn't passed here directly.
   // This logic should ideally use the weight from the parent component for accuracy.

  const calculateGoalTime = () => {
    // This is still using a simplified/placeholder calculation
    if (!bmi.targetWeight) return null;

    // We can't use bmi.value as the current weight. 
    // Assuming the parent passes the current weight (which is the actual input weight):
    const currentWeight = parseFloat(bmi.weight || 70); // Placeholder if real weight isn't available
    const weightDiff = Math.abs(parseFloat(bmi.targetWeight) - currentWeight);
    const direction = parseFloat(bmi.targetWeight) > currentWeight ? "gain" : "lose";

    // Rough Estimate: Assuming 0.5 kg loss/gain per week on average for a moderate plan.
    const weeks = Math.ceil(weightDiff / 0.5); 
    const months = Math.ceil(weeks / 4.3);
    
    if (isNaN(weeks) || weeks === Infinity || weightDiff === 0) return null;

    return { weeks, months, direction, weightDiff: weightDiff.toFixed(1) };
  };

  const goalTime = calculateGoalTime();
  const goalMessage = goalTime 
    ? `🎯 Estimated time to ${goalTime.direction} ${goalTime.weightDiff}kg: **${goalTime.months} months**`
    : null;

  return (
    <AnimatePresence>
      {bmi && (
        <motion.div
          key="results"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
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
          
          {/* BMI Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((bmi.value / 40) * 100, 100)}%` }}
              transition={{ duration: 1 }}
              className="h-3 rounded-full bg-gradient-to-r from-teal-400 to-teal-600"
            ></motion.div>
          </div>

          {/* Goal Message */}
          {goalTime && (
            <p className="text-sm text-center text-gray-700 bg-teal-50 p-2 rounded mb-4">
              {goalMessage.replace(/\*\*/g, ' **')} 
            </p>
          )}

          <h3 className="text-lg font-semibold text-teal-500 mb-3 border-t border-gray-200 pt-3">
            Your Personalized Daily Plan ({bmi.weeklyGoal.split(" (")[1].replace(")", "")})
          </h3>
          <p className="text-sm text-gray-600 mb-4 font-medium">{bmi.calories}</p>


          {/* Structured Exercise List (Warmup, Main, Cooldown) */}
          <div className="space-y-4">
                {/* 1. Warmup */}
                {plan.warmup && plan.warmup.length > 0 && (
                    <ExerciseList 
                        title="Warm-up" 
                        icon={<FaFire />} 
                        exercises={plan.warmup} 
                    />
                )}
                {/* 2. Main Workout */}
                {plan.main_workout && plan.main_workout.length > 0 && (
                    <ExerciseList 
                        title="Main Workout Routine" 
                        icon={<FaDumbbell />} 
                        exercises={plan.main_workout} 
                    />
                )}
                {/* 3. Cool-down */}
                {plan.cooldown && plan.cooldown.length > 0 && (
                    <ExerciseList 
                        title="Cool-down & Stretch" 
                        icon={<FaSnowflake />} 
                        exercises={plan.cooldown} 
                    />
                )}
            </div>

          
          {/* Tip of the Day */}
          {tip && (
            <div className="bg-teal-50 p-4 rounded-lg text-sm text-center text-gray-700 italic border border-teal-200 mt-4">
              💡 {tip}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FitnessResults;