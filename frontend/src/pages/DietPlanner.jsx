import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import API from "../utils/Api";
const DietPlanner = () => {
  const [preferences, setPreferences] = useState("");
  const [dietType, setDietType] = useState("Vegetarian");
  const [goal, setGoal] = useState("Weight Loss");
  const [reason, setReason] = useState("General Health");
  const [days, setDays] = useState(7);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [symptoms, setSymptoms] = useState("");
  const [report, setReport] = useState(null);

  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const handleFileChange = (e) => {
    setReport(e.target.files[0]);
  };

  const generatePlan = async () => {
    if (!age && !preferences && !symptoms && !report) {
      alert("Please enter details, symptoms, or upload a report.");
      return;
    }
    setLoading(true);
    setPlan("");

    try {
      const formData = new FormData();
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("goal", goal);
      formData.append("dietType", dietType);
      formData.append("reason", reason);
      formData.append("days", days);
      formData.append("preferences", preferences);
      formData.append("symptoms", symptoms);
      if (report) formData.append("report", report);

      const res = await API.post("/diet/plan", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPlan(res.data.plan);
      setShowForm(false); // Hide the form on success
    } catch (err) {
      console.error("Error generating diet plan:", err);
      alert("Oops! Something went wrong while generating your diet plan.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToForm = () => {
    setShowForm(true);
    setPlan("");
    // Optionally clear other states if you want a fresh form
    // setAge(""); setGender("Male"); ...
  };

  // Framer Motion variants for card animations
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
    exit: { opacity: 0, y: 50, scale: 0.95, transition: { duration: 0.5, ease: "easeIn" } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8 flex flex-col items-center justify-center font-sans relative overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-6xl md:text-7xl font-extrabold text-green-800 mb-6 drop-shadow-lg"
      >
        🌿 AI Diet Guru
      </motion.h1>

      <AnimatePresence mode="wait">
        {showForm ? (
          <motion.div
            key="form"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-4xl border border-green-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <motion.input variants={itemVariants} type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all" />
              <motion.select variants={itemVariants} value={gender} onChange={(e) => setGender(e.target.value)} className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all">
                <option>Male</option><option>Female</option><option>Other</option>
              </motion.select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <motion.select variants={itemVariants} value={goal} onChange={(e) => setGoal(e.target.value)} className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all">
                <option>Weight Loss</option><option>Muscle Gain</option><option>Balanced Nutrition</option>
              </motion.select>
              <motion.select variants={itemVariants} value={dietType} onChange={(e) => setDietType(e.target.value)} className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all">
                <option>Vegetarian</option><option>Vegan</option><option>Keto</option><option>Paleo</option><option>Non-Vegetarian</option>
              </motion.select>
            </div>

            <motion.div variants={itemVariants} className="mb-6">
              <label className="block mb-2 font-semibold text-gray-700">Reason for Diet</label>
              <select value={reason} onChange={(e) => setReason(e.target.value)} className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all">
                <option>General Health</option><option>Diabetes</option><option>PCOS</option><option>Heart Health</option><option>Other</option>
              </select>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6">
              <label className="block mb-2 font-semibold text-gray-700">Number of Days</label>
              <input type="number" value={days} onChange={(e) => setDays(e.target.value)} className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all" min="1" />
            </motion.div>

            <motion.textarea variants={itemVariants} value={preferences} onChange={(e) => setPreferences(e.target.value)} placeholder="Extra notes (allergies, cuisine preferences...)" rows="3" className="w-full p-4 border border-gray-300 rounded-xl mb-6 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all resize-y" />

            <motion.textarea variants={itemVariants} value={symptoms} onChange={(e) => setSymptoms(e.target.value)} placeholder="Not feeling well? Describe your symptoms (e.g., fatigue, digestive issues)..." rows="3" className="w-full p-4 border border-gray-300 rounded-xl mb-6 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all resize-y" />

            <motion.div variants={itemVariants} className="mb-6">
              <label className="block mb-2 font-semibold text-gray-700">Upload Health Report (Optional)</label>
              <input type="file" accept=".pdf,.png,.jpg,.jpeg" onChange={handleFileChange} className="w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={generatePlan}
              disabled={loading}
              className="w-full bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed text-lg flex items-center justify-center"
            >
              {loading ? (
                <span className="flex items-center">
                  <AiOutlineLoading3Quarters className="animate-spin mr-3 text-2xl" />
                  Generating Your Plan...
                </span>
              ) : (
                "✨ Generate My Personalized Diet Plan"
              )}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="plan"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="mt-12 bg-white p-8 rounded-3xl shadow-2xl w-full max-w-4xl border border-green-300"
          >
            <h2 className="text-4xl font-extrabold text-green-700 mb-6 text-center">
              🎉 Your Personalized Diet Plan
            </h2>
            <div className="prose prose-lg prose-green max-w-none text-gray-800 leading-relaxed">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4 text-green-800" {...props} />,
                  h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold mt-6 mb-3 text-green-700" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="text-xl font-medium mt-5 mb-2 text-green-600" {...props} />,
                  p: ({ node, ...props }) => <p className="mb-3 leading-relaxed" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc list-inside ml-4 mb-4 space-y-2" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-decimal list-inside ml-4 mb-4 space-y-2" {...props} />,
                  li: ({ node, ...props }) => <li className="text-gray-700" {...props} />,
                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto my-6">
                      <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg shadow-sm" {...props} />
                    </div>
                  ),
                  th: ({ node, ...props }) => <th className="px-6 py-3 bg-green-50 text-left text-xs font-medium text-green-700 uppercase tracking-wider" {...props} />,
                  td: ({ node, ...props }) => <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border-t border-gray-100" {...props} />,
                  strong: ({ node, ...props }) => <strong className="font-bold text-green-800" {...props} />,
                }}
              >
                {plan}
              </ReactMarkdown>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBackToForm}
              className="w-full mt-8 bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-300 ease-in-out text-lg flex items-center justify-center"
            >
              Go Back to Form
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DietPlanner;