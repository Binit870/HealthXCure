// src/components/FitnessPlanner.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import API from "../../utils/Api";
import { useAuth } from "../../context/AuthContext";
import FitnessResults from "./FitnessResults";
import FitnessHistory from "./FitnessHistory";
import { FaHistory, FaArrowLeft, FaDumbbell } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const resetInputs = () => {
    setHeight("");
    setWeight("");
    setTargetWeight("");
    setWeeklyGoal(weeklyGoals[0]);
    setPreferredExercises("");
  };

  const resetAll = () => {
    resetInputs();
    setPlan(null);
    setBmi(null);
    setTip("");
  };

  const fetchHistory = async () => {
    try {
      if (!userId) return;
      const res = await API.get(`/fitness/history/${userId}`);

      if (res.data.success) {
        const historyData = res.data.history.map((entry) => ({
          ...entry,
          plan:
            typeof entry.plan === "string"
              ? JSON.parse(entry.plan)
              : entry.plan,
        }));
        setHistory(historyData);
      }
    } catch {
      toast.error("Unable to load fitness history.");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [userId]);

  const calculateBMI = async () => {
    if (!height || !weight) {
      toast.error("Please enter height and weight.");
      return;
    }

    try {
      const res = await API.post("/fitness/plan", {
        userId,
        height,
        weight,
        weeklyGoal,
        targetWeight,
        preferredExercises,
      });

      const {
        bmi: bmiValue,
        category,
        plan: planData,
        calories,
        tip: tipText,
      } = res.data;

      setBmi({
        value: Number.isFinite(bmiValue)
          ? parseFloat(bmiValue).toFixed(1)
          : bmiValue,
        category,
        calories,
        targetWeight,
        weeklyGoal,
        weight,
      });

      setPlan(planData);
      setTip(tipText || "");

      toast.success("Plan generated successfully.");
      fetchHistory();
    } catch {
      toast.error("Unable to generate plan.");
    }
  };

  const handleBack = () => resetAll();

  return (
    <div className="min-h-screen bg-teal-100 flex flex-col items-center px-3 sm:px-4 py-4 sm:py-6 md:py-10 overflow-x-hidden">

      {/* TOP BAR */}
      <div className="w-full max-w-3xl lg:max-w-4xl xl:max-w-5xl flex items-center justify-between px-2 mb-4 sm:mb-6 md:mb-10 gap-2">

        <div className="flex items-center justify-start" style={{ width: "40px" }}>
          {plan && (
            <button
              onClick={handleBack}
              className="text-teal-700 hover:text-teal-900 transition"
            >
              <FaArrowLeft className="text-base sm:text-lg md:text-xl" />
            </button>
          )}
        </div>

        <h1 className="flex-1 flex items-center justify-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-teal-700 gap-2 min-w-0">
          <FaDumbbell className="text-teal-800 text-base sm:text-lg md:text-xl lg:text-2xl" />
          <span className="truncate">MetricFit Planner</span>
        </h1>

        <div className="flex justify-end" style={{ width: "90px" }}>
          <button
            onClick={() => setShowHistory((s) => !s)}
            className="flex items-center gap-1 bg-teal-600 hover:bg-teal-700 text-white px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg shadow transition text-xs sm:text-sm md:text-base"
          >
            <FaHistory className="text-xs sm:text-sm md:text-base" />
            <span className="hidden sm:inline">
              {showHistory ? "Close" : "History"}
            </span>
            <span className="inline sm:hidden">{showHistory ? "×" : "H"}</span>
          </button>
        </div>
      </div>

      {/* HISTORY MODAL */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-2 sm:p-4"
            onClick={() => setShowHistory(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white w-full max-w-2xl max-h-[90vh] sm:max-h-[85vh] overflow-y-auto rounded-xl shadow-xl p-3 sm:p-4 md:p-6 relative mx-2 min-w-0"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowHistory(false)}
                className="absolute top-2 right-2 sm:top-3 sm:right-3 text-teal-700 hover:text-teal-900 text-sm sm:text-base px-2 py-1 hover:bg-teal-50 rounded transition"
              >
                Close
              </button>

              <FitnessHistory
                history={history.map((item) => ({
                  ...item,
                  onView: (entry) => {
                    setPlan(entry.plan);
                    setBmi({
                      value: entry.bmi,
                      category: entry.category,
                      calories: entry.calories,
                      weeklyGoal: entry.weeklyGoal,
                      targetWeight: entry.targetWeight,
                      weight: entry.weight,
                    });
                    setTip(entry.tip || "");
                    setShowHistory(false);
                  },
                }))}
                fetchHistory={fetchHistory}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      <AnimatePresence mode="wait">
        {!plan ? (
          <motion.div
            key="planner"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="bg-white w-full max-w-3xl lg:max-w-4xl rounded-xl shadow-xl p-4 sm:p-6 md:p-8 min-w-0"
          >
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-teal-600 mb-4 sm:mb-5 text-center">
              Enter Your Details
            </h2>

            <div className="space-y-3 sm:space-y-4">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 min-w-0">
                <input
                  type="number"
                  placeholder="Height (cm)"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-gray-50 border border-teal-300  focus:ring-teal-500"
                />

                <input
                  type="number"
                  placeholder="Current Weight (kg)"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-gray-50 border border-teal-300  focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 min-w-0">
                <input
                  type="number"
                  placeholder="Target Weight (kg)"
                  value={targetWeight}
                  onChange={(e) => setTargetWeight(e.target.value)}
                  className="w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-gray-50 border border-teal-300 focus:ring-teal-500"
                />

                <select
                  value={weeklyGoal}
                  onChange={(e) => setWeeklyGoal(e.target.value)}
                  className="w-full min-w-0 px-2.5 sm:px-3 py-2.5 sm:py-3 rounded-lg bg-gray-50 border border-teal-300 focus:ring-teal-500 text-xs sm:text-sm"
                >
                  {weeklyGoals.map((goal) => (
                    <option key={goal} value={goal}>
                      {goal}
                    </option>
                  ))}
                </select>
              </div>

              <input
                type="text"
                placeholder="Preferred Exercises"
                value={preferredExercises}
                onChange={(e) => setPreferredExercises(e.target.value)}
                className="w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-gray-50 border border-teal-300 focus:ring-teal-500"
              />

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                <button
                  onClick={calculateBMI}
                  className="flex-1 py-2.5 sm:py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 shadow"
                >
                  Generate Plan
                </button>

                <button
                  onClick={resetAll}
                  className="w-full sm:w-auto px-4 py-2.5 sm:py-3 bg-gray-200 text-teal-700 font-semibold rounded-lg hover:bg-gray-300"
                >
                  Reset
                </button>
              </div>
            </div>
          </motion.div>

        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="w-full max-w-4xl lg:max-w-5xl px-2 min-w-0"
          >
            <FitnessResults bmi={bmi} plan={plan} tip={tip} />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default FitnessPlanner;
