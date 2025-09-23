import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHistory, FaPlusCircle } from "react-icons/fa";
import { GiForkKnifeSpoon } from "react-icons/gi";
import API from "../../utils/Api";
import DietForm from "./DietForm";
import DietPlanResult from "./DietPlanResult";
import DietHistory from "./DietHistory";
import { useAuth } from "../../context/AuthContext";

const DietPlanner = () => {
  const { user, token } = useAuth();

  const [formData, setFormData] = useState({
    preferences: "",
    dietType: "Vegetarian",
    goal: "Weight Loss",
    reason: "General Health",
    days: 7,
    age: "",
    gender: "Male",
    height: "",
    weight: "",
    symptoms: "",
    diseases: "",
    report: null,
  });

  const [plan, setPlan] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleFileChange = (file) => {
    setFormData({ ...formData, report: file });
  };

  const generatePlan = async () => {
    const { age, preferences, symptoms, report, diseases, height, weight } = formData;

    if (!age && !preferences && !symptoms && !report && !diseases && !height && !weight) {
      alert("Please fill in some details to generate a plan.");
      return;
    }

    setLoading(true);
    setPlan(null);
    setShowHistory(false);
    setSelectedPlan(null);

    try {
      const formDataObj = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) formDataObj.append(key, value);
      });
      formDataObj.append("userId", user?._id);

      const res = await API.post("/diet/plan", formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      const newPlan = res.data.newDiet;
      setPlan(newPlan);
      setShowForm(false);
    } catch (err) {
      console.error("Error generating diet plan:", err);
      alert("Oops! Something went wrong while generating your diet plan.");
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async () => {
    if (!user?._id) {
      alert("Please log in to view your history.");
      return;
    }
    setLoading(true);
    setShowForm(false);
    setPlan(null);
    setSelectedPlan(null);

    try {
      const res = await API.get(`/diet/history/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistory(res.data);
      setShowHistory(true);
    } catch (err) {
      console.error("Failed to fetch diet history:", err);
      alert("Failed to load history. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (planId) => {
    if (window.confirm("Are you sure you want to delete this diet plan?")) {
      try {
        await API.delete(`/diet/history/${planId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHistory(history.filter((plan) => plan._id !== planId));
      } catch (err) {
        console.error("Failed to delete diet plan:", err);
        alert("Failed to delete the plan.");
      }
    }
  };

  const handleBackToForm = () => {
    setShowForm(true);
    setPlan(null);
    setShowHistory(false);
    setSelectedPlan(null);
  };

  const handleBackToHistory = () => {
    setSelectedPlan(null);
    setShowHistory(true);
  };

  return (
   <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-cyan-800 to-cyan-950 px-4 sm:px-6 md:px-10 lg:px-20 py-10 flex flex-col items-center justify-center font-sans relative overflow-x-hidden">
  {/* Title */}
  <motion.h1
    initial={{ opacity: 0, y: -40, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{
      duration: 1,
      ease: "easeOut",
      type: "spring",
      stiffness: 120,
    }}
    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-center tracking-tight text-emerald-400 drop-shadow-lg"
    style={{ fontFamily: "'Poppins', sans-serif" }}
  >
    <GiForkKnifeSpoon className="inline mr-3 animate-pulse" />
    Your Personal Diet Guru
  </motion.h1>

  {/* Action Buttons */}
  <div className="relative sm:absolute top-4 sm:top-6 right-0 sm:right-6 z-20 flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-8 w-full sm:w-auto justify-end">
  {user && showForm && (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={fetchHistory}
      className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-3 bg-gray-800 text-cyan-300 rounded-full shadow-lg hover:shadow-xl transition-all font-medium border-2 border-cyan-300 text-sm sm:text-base"
    >
      <FaHistory />
      History
    </motion.button>
  )}
  {user && (showHistory || selectedPlan) && (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleBackToForm}
      className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-3 bg-gray-800 text-green-400 rounded-full shadow-lg hover:shadow-xl transition-all font-medium border border-green-500 text-sm sm:text-base"
    >
      <FaPlusCircle />
      New Plan
    </motion.button>
  )}
</div>


{/* Main Content */}
<div className="w-full max-w-full sm:max-w-5xl flex flex-col items-center mt-14 sm:mt-0">

    <AnimatePresence mode="wait">
      {showForm ? (
        <DietForm
          key="form"
          formData={formData}
          setFormData={setFormData}
          generatePlan={generatePlan}
          handleFileChange={handleFileChange}
          loading={loading}
          darkTheme={true}
        />
      ) : selectedPlan ? (
        <DietPlanResult
          key="selected-plan"
          plan={selectedPlan.plan || selectedPlan}
          handleBackToForm={handleBackToForm}
          fetchHistory={fetchHistory}
          handleBackToHistory={handleBackToHistory}
          isHistoryView={true}
          darkTheme={true}
        />
      ) : showHistory ? (
        <DietHistory
          key="history"
          history={history}
          loading={loading}
          handleDelete={handleDelete}
          handleBackToForm={handleBackToForm}
          setSelectedPlan={setSelectedPlan}
          darkTheme={true}
        />
      ) : (
        <DietPlanResult
          key="plan"
          plan={plan}
          handleBackToForm={handleBackToForm}
          fetchHistory={fetchHistory}
          handleBackToHistory={handleBackToHistory}
          darkTheme={true}
        />
      )}
    </AnimatePresence>
  </div>
</div>

  );
};

export default DietPlanner;