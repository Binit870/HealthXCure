// src/components/FitnessPlanner.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRedo, FaHistory, FaArrowLeft } from "react-icons/fa";
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
  const [targetWeight, setTargetWeight] = useState("");
  const [weeklyGoal, setWeeklyGoal] = useState(weeklyGoals[0]);
  const [preferredExercises, setPreferredExercises] = useState("");
  const [bmi, setBmi] = useState(null);
  const [plan, setPlan] = useState(null);
  const [tip, setTip] = useState("");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const fetchHistory = async () => {
    try {
      if (!userId) return;
      const res = await API.get(`/fitness/history/${userId}`);
      if (res.data.success) {
        const historyData = res.data.history.map(entry => ({
          ...entry,
          plan: typeof entry.plan === "string" ? JSON.parse(entry.plan) : entry.plan
        }));
        setHistory(historyData);
      }
    } catch (err) {
      console.error("❌ Error fetching history:", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [userId]);

  const calculateBMI = async () => {
    if (!height || !weight) return alert("Please enter height and weight.");
    try {
      const res = await API.post("/fitness/plan", {
        userId,
        height,
        weight,
        weeklyGoal,
        targetWeight,
        preferredExercises,
      });
      const { bmi, category, plan, calories, tip } = res.data;
      setBmi({
        value: bmi,
        category,
        calories,
        targetWeight,
        weeklyGoal,
        weight,
      });
      setPlan(plan);
      setTip(tip);
      fetchHistory();
    } catch (err) {
      console.error("❌ Error generating plan:", err);
      alert(`Error generating plan: ${err.response?.data?.message || err.message}`);
    }
  };

  const resetPlanner = () => {
    setHeight("");
    setWeight("");
    setTargetWeight("");
    setWeeklyGoal(weeklyGoals[0]);
    setPreferredExercises("");
    setBmi(null);
    setPlan(null);
    setTip("");
  };

  const handleBack = () => {
    setPlan(null);
    setBmi(null);
    setTip("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-teal-50 flex flex-col items-center px-4 py-8">
      {/* Top Bar */}
      <div className="w-full max-w-2xl flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-teal-700 tracking-tight">
          🏋️ AI Fitness Planner
        </h1>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl font-semibold shadow-md transition"
        >
          <FaHistory /> {showHistory ? "Close History" : "View History"}
        </button>
      </div>

      {/* History Modal */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="bg-white w-11/12 md:w-2/3 lg:w-1/2 rounded-2xl shadow-2xl p-6 relative"
            >
              <button
                onClick={() => setShowHistory(false)}
                className="absolute top-3 right-3 text-teal-600 hover:text-teal-800"
              >
                ✖
              </button>
              <FitnessHistory history={history} fetchHistory={fetchHistory} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {!plan ? (
          <motion.div
            key="planner"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-2xl border border-teal-100 p-8 w-full max-w-2xl"
          >
            <h2 className="text-xl font-bold text-teal-600 mb-4 text-center">
              Enter Your Details
            </h2>
            <div className="space-y-4">
              <input
                type="number"
                placeholder="Height (cm)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none"
              />
              <input
                type="number"
                placeholder="Current Weight (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none"
              />
              <input
                type="number"
                placeholder="Target Weight (kg)"
                value={targetWeight}
                onChange={(e) => setTargetWeight(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none"
              />
              <select
                value={weeklyGoal}
                onChange={(e) => setWeeklyGoal(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-teal-500"
              >
                {weeklyGoals.map((goal) => (
                  <option key={goal}>{goal}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Preferred Exercises (e.g. yoga, cycling)"
                value={preferredExercises}
                onChange={(e) => setPreferredExercises(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-teal-500"
              />
              <div className="flex gap-3">
                <button
                  onClick={calculateBMI}
                  className="flex-1 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 shadow-md"
                >
                  Generate Plan
                </button>
                <button
                  onClick={resetPlanner}
                  className="p-3 bg-gray-200 rounded-xl text-teal-600 hover:bg-gray-300 shadow-md"
                >
                  <FaRedo />
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl"
          >
            <button
              onClick={handleBack}
              className="flex items-center gap-2 mb-4 text-teal-600 font-semibold hover:underline"
            >
              <FaArrowLeft /> Back to Planner
            </button>
            <FitnessResults bmi={bmi} plan={plan} tip={tip} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FitnessPlanner;
