import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHistory, FaSpinner, FaPlusCircle } from "react-icons/fa";
import API from "../../utils/Api";
import { cardVariants } from "./variants";
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
    const { age, preferences, symptoms, report, diseases } = formData;
    if (!age && !preferences && !symptoms && !report && !diseases) {
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8 flex flex-col items-center justify-center font-sans relative overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-5xl md:text-6xl font-extrabold text-green-800 mb-6 drop-shadow-md text-center"
      >
        🌿 Your Personal Diet Guru
      </motion.h1>

      <div className="absolute top-8 right-8 z-20 flex gap-4">
        {user && showForm && (
          <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.97 }}
  onClick={fetchHistory}
  className="flex items-center gap-2 p-3 bg-transparent text-green-700 rounded-full shadow-lg hover:shadow-xl transition-all font-medium border-2 border-green-700"
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
            className="flex items-center gap-2 p-3 bg-white text-green-700 rounded-full shadow-lg hover:shadow-xl transition-all font-medium border border-green-200"
          >
            <FaPlusCircle />
            New Plan
          </motion.button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {showForm ? (
          <DietForm
            key="form"
            formData={formData}
            setFormData={setFormData}
            generatePlan={generatePlan}
            handleFileChange={handleFileChange}
            loading={loading}
          />
        ) : selectedPlan ? (
          <DietPlanResult
            key="selected-plan"
            plan={selectedPlan.plan || selectedPlan}
            handleBackToForm={handleBackToForm}
            fetchHistory={fetchHistory}
            handleBackToHistory={handleBackToHistory}
            isHistoryView={true}
          />
        ) : showHistory ? (
          <DietHistory
            key="history"
            history={history}
            loading={loading}
            handleDelete={handleDelete}
            handleBackToForm={handleBackToForm}
            setSelectedPlan={setSelectedPlan}
          />
        ) : (
          <DietPlanResult
            key="plan"
            plan={plan}
            handleBackToForm={handleBackToForm}
            fetchHistory={fetchHistory}
            handleBackToHistory={handleBackToHistory}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default DietPlanner;