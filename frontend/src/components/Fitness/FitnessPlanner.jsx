// src/components/FitnessPlanner.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaDumbbell, FaRunning, FaWalking, FaBiking, FaSwimmer, FaRedo } from "react-icons/fa";
import API from "../../utils/Api";
import { useAuth } from "../../context/AuthContext";
import FitnessResults from "./FitnessResults";
import FitnessHistory from "./FitnessHistory";

const weeklyGoals = [
  "3 sessions/week (Beginner)",
  "4 sessions/week (Intermediate)",
  "5 sessions/week (Advanced)",
];

const FitnessPlanner = () => {
  const { user } = useAuth();
  const userId = user?._id;

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [targetWeight, setTargetWeight] = useState(""); // 💡 NEW STATE
  const [weeklyGoal, setWeeklyGoal] = useState(weeklyGoals[0]); // 💡 NEW STATE
  const [bmi, setBmi] = useState(null);
  const [plan, setPlan] = useState(null);
  const [tip, setTip] = useState("");
  const [history, setHistory] = useState([]);

  const tips = [
    "💧 Stay hydrated: drink at least 2-3 liters of water daily.",
    "🥗 Eat more whole foods like fruits, vegetables, and lean protein.",
    "🛌 Sleep at least 7–8 hours every night for better recovery.",
    "🚶 Take small breaks during work to stretch and move around.",
    "🏃 Consistency beats intensity — small steps daily matter!",
  ];

  const fetchHistory = async () => {
    try {
      if (!userId) return;
      const res = await API.get(`/fitness/history/${userId}`);
      if (res.data.success) {
        setHistory(res.data.history);
      } else {
        setHistory([]);
      }
    } catch (err) {
      console.error("❌ Error fetching fitness history:", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [userId]);

  const calculateBMI = async () => {
    if (!height || !weight) return alert("Please enter current height and weight.");
    if (targetWeight && parseFloat(targetWeight) <= 0) return alert("Target weight must be a positive number.");

    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);

    let category = "";
    let exercises = [];
    let calories = "";
    let finalRecommendation = `Based on your goal of **${weeklyGoal}**, focus on integrating the following activities.`;

    if (bmiValue < 18.5) {
      category = "Underweight";
      exercises = [
        { name: "Strength Training (3x/week)", icon: <FaDumbbell /> },
        { name: "Yoga for flexibility", icon: <FaRunning /> },
        { name: "Weightlifting basics", icon: <FaDumbbell /> },
      ];
      calories = "🍽️ Aim for 2200–2500 kcal/day with protein-rich foods (to gain).";
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
      calories = "🍽️ Reduce to ~1800 kcal/day, focusing on lean proteins & veggies (to lose).";
    } else {
      category = "Obese";
      exercises = [
        { name: "Walking (daily, low impact)", icon: <FaWalking /> },
        { name: "Swimming (safe cardio)", icon: <FaSwimmer /> },
        { name: "Resistance Bands", icon: <FaDumbbell /> },
      ];
      calories = "🍽️ Stick to 1500–1700 kcal/day, consult a nutritionist (to lose).";
    }

    const bmiData = { value: bmiValue, category, calories, targetWeight: targetWeight || null, weeklyGoal, finalRecommendation };
    setBmi(bmiData);
    setPlan(exercises);
    setTip(tips[Math.floor(Math.random() * tips.length)]);

    try {
      if (userId) {
        const saveRes = await API.post("/fitness/save", {
          userId,
          height,
          weight,
          bmi: bmiValue,
          category,
          plan: exercises.map((ex) => ex.name),
          calories,
        });
        console.log("✅ Saved fitness entry:", saveRes.data);
        fetchHistory();
      } else {
        console.warn("⚠️ No userId found, not saving to backend");
      }
    } catch (err) {
      console.error("❌ Error saving fitness data:", err);
    }
  };

  const resetPlanner = () => {
    setHeight("");
    setWeight("");
    setTargetWeight(""); // Reset new state
    setWeeklyGoal(weeklyGoals[0]); // Reset new state
    setBmi(null);
    setPlan(null);
    setTip("");
  };

  return (
    // Simple white background, dark text
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        // White box with teal border/shadow
        className="bg-white rounded-2xl shadow-2xl border border-teal-100 p-8 w-full max-w-lg"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-teal-600 mb-6">
          🏋️ Fitness Planner
        </h1>
        <div className="space-y-4 mb-6">
          {/* Input 1: Height */}
          <input
            type="number"
            placeholder="Enter current height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            // Clean white/gray/teal focus styling
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-800"
          />
          {/* Input 2: Current Weight */}
          <input
            type="number"
            placeholder="Enter current weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-800"
          />
          {/* Input 3: Target Weight (NEW) */}
          <input
            type="number"
            placeholder="Enter target weight (kg, optional)"
            value={targetWeight}
            onChange={(e) => setTargetWeight(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-800"
          />
          {/* Input 4: Weekly Goal (NEW DROPDOWN) */}
          <select
            value={weeklyGoal}
            onChange={(e) => setWeeklyGoal(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-800 appearance-none"
          >
            {weeklyGoals.map((goal) => (
              <option key={goal} value={goal}>
                Weekly Goal: {goal}
              </option>
            ))}
          </select>

          <div className="flex space-x-3 pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={calculateBMI}
              // Teal primary button
              className="flex-1 py-3 rounded-xl font-semibold text-lg bg-teal-600 text-white shadow-md hover:bg-teal-700 transition"
            >
              Generate Plan
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetPlanner}
              // Subtle gray/teal reset button
              className="p-3 rounded-xl bg-gray-200 hover:bg-gray-300 text-teal-600 shadow-md"
            >
              <FaRedo />
            </motion.button>
          </div>
        </div>
        <FitnessResults bmi={bmi} plan={plan} tip={tip} />
        <FitnessHistory history={history} fetchHistory={fetchHistory} />
      </motion.div>
    </div>
  );
};

export default FitnessPlanner;

