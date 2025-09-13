// src/components/FitnessPlanner.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaDumbbell, FaRunning, FaWalking, FaBiking, FaSwimmer, FaRedo } from "react-icons/fa";
import API from "../../utils/Api";
import { useAuth } from "../../context/AuthContext";
import FitnessResults from "./FitnessResults";
import FitnessHistory from "./FitnessHistory";

const FitnessPlanner = () => {
  const { user } = useAuth();
  const userId = user?._id;

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
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
    if (!height || !weight) return alert("Please enter both height and weight");

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

    const bmiData = { value: bmiValue, category, calories };
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
        <h1 className="text-3xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-6">
          🏋️ Fitness Planner
        </h1>
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
        <FitnessResults bmi={bmi} plan={plan} tip={tip} />
        <FitnessHistory history={history} fetchHistory={fetchHistory} />
      </motion.div>
    </div>
  );
};

export default FitnessPlanner;