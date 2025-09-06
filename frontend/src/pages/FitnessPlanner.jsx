// src/components/FitnessPlanner.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaDumbbell,
  FaRunning,
  FaWalking,
  FaBiking,
  FaSwimmer,
  FaRedo,
} from "react-icons/fa";

const FitnessPlanner = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [plan, setPlan] = useState(null);
  const [tip, setTip] = useState("");

  const tips = [
    "💧 Stay hydrated: drink at least 2-3 liters of water daily.",
    "🥗 Eat more whole foods like fruits, vegetables, and lean protein.",
    "🛌 Sleep at least 7–8 hours every night for better recovery.",
    "🚶 Take small breaks during work to stretch and move around.",
    "🏃 Consistency beats intensity — small steps daily matter!",
  ];

  // Function to calculate BMI and plan
  const calculateBMI = () => {
    if (!height || !weight)
      return alert("Please enter both height and weight");

    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);

    let category = "";
    let exercises = [];
    let calories = "";

    if (bmiValue < 18.5) {
      category = "Underweight";
      exercises = [
        { name: "Strength Training (3x/week)", icon: <FaDumbbell /> },
        { name: "Yoga for flexibility", icon: <FaRunning /> },
        { name: "Weightlifting basics", icon: <FaDumbbell /> },
      ];
      calories = "🍽️ Aim for 2200–2500 kcal/day with protein-rich foods.";
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      category = "Normal";
      exercises = [
        { name: "Cardio (running/cycling)", icon: <FaRunning /> },
        { name: "Strength Training (2x/week)", icon: <FaDumbbell /> },
        { name: "Stretching & Yoga", icon: <FaWalking /> },
      ];
      calories = "🍽️ Maintain around 2000–2200 kcal/day with a balanced diet.";
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
      category = "Overweight";
      exercises = [
        { name: "Brisk Walking (daily)", icon: <FaWalking /> },
        { name: "Cycling / HIIT (3-4x/week)", icon: <FaBiking /> },
        { name: "Bodyweight Training", icon: <FaDumbbell /> },
      ];
      calories = "🍽️ Reduce to ~1800 kcal/day, focusing on lean proteins & veggies.";
    } else {
      category = "Obese";
      exercises = [
        { name: "Walking (daily, low impact)", icon: <FaWalking /> },
        { name: "Swimming (safe cardio)", icon: <FaSwimmer /> },
        { name: "Resistance Bands", icon: <FaDumbbell /> },
      ];
      calories = "🍽️ Stick to 1500–1700 kcal/day, consult a nutritionist.";
    }

    setBmi({ value: bmiValue, category, calories });
    setPlan(exercises);

    // Pick random tip
    setTip(tips[Math.floor(Math.random() * tips.length)]);
  };

  // Reset all values
  const resetPlanner = () => {
    setHeight("");
    setWeight("");
    setBmi(null);
    setPlan(null);
    setTip("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700 p-8 w-full max-w-lg"
      >
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-6">
          🏋️ Fitness Planner
        </h1>

        {/* Input Form */}
        <div className="space-y-4 mb-6">
          <input
            type="number"
            placeholder="Enter height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Enter weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={calculateBMI}
              className="flex-1 py-3 rounded-xl font-semibold text-lg bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg"
            >
              Generate Plan
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetPlanner}
              className="p-3 rounded-xl bg-gray-700 hover:bg-gray-600 text-white shadow-lg"
            >
              <FaRedo />
            </motion.button>
          </div>
        </div>

        {/* Results Section */}
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

              {/* BMI Progress Bar */}
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

              {/* Fitness Tip */}
              {tip && (
                <div className="bg-gray-800 p-4 rounded-lg text-sm text-center text-gray-300 italic border border-gray-600">
                  💡 {tip}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default FitnessPlanner;
