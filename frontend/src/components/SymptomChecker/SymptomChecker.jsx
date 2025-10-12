import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStethoscope, FaHistory } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";
import API from "../../utils/Api";
import SymptomDisclaimer from "./SymptomDisclaimer";
import SymptomInput from "./Input/SymptomInput";
import SymptomResults from "./SymptomResults";
import SymptomHistory from "./SymptomHistory";

const SymptomChecker = () => {
  // Core states
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [showHistory, setShowHistory] = useState(false);

  // ✅ Unified symptom state (includes both checkbox + typed inputs)
  const [symptomsList, setSymptomsList] = useState([]);

  // ✅ Optional extra fields (pain, etc.)
  const [checkedPainAreas, setCheckedPainAreas] = useState([]);
  const [painDescriptions, setPainDescriptions] = useState("");
  const [medication, setMedication] = useState("");
  const [otherInfo, setOtherInfo] = useState("");

  // ✅ Reset function (clean version)
  const handleReset = () => {
    setSymptomsList([]);
    setCheckedPainAreas([]);
    setPainDescriptions("");
    setMedication("");
    setOtherInfo("");
    setAge("");
    setGender("");
    setResults([]);
    setError("");
    setLoading(false);
  };

  // ✅ Handles API call
  const handleCheckSymptoms = async () => {
    if (symptomsList.length === 0) {
      setError("⚠️ Please add or select at least one symptom.");
      return;
    }

    setError("");
    setLoading(true);
    setResults([]);

    try {
      const res = await API.post("/symptoms/check", {
        symptoms: symptomsList,
        age,
        gender,
        painAreas: checkedPainAreas,
        painDescriptions,
        medication,
        otherInfo,
      });

      if (res.data && Array.isArray(res.data.conditions)) {
        setResults(res.data.conditions);
      } else {
        setError("❌ Unexpected API response.");
      }
    } catch (err) {
      setError("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-8 sm:py-12 text-gray-100 overflow-hidden"
      style={{
        backgroundImage: "url('symptom.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Glow Orbs */}
      <div className="absolute top-10 left-5 sm:left-10 w-28 sm:w-40 h-28 sm:h-40 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-40 sm:w-56 h-40 sm:h-56 bg-green-400/20 rounded-full blur-3xl animate-bounce"></div>
      <div className="absolute top-1/3 right-1/4 w-24 sm:w-32 h-24 sm:h-32 bg-teal-400/20 rounded-full blur-3xl animate-ping"></div>

      {/* Disclaimer */}
      <SymptomDisclaimer
        show={showDisclaimer}
        onClose={() => setShowDisclaimer(false)}
      />

      <AnimatePresence mode="wait">
        {showHistory ? (
          <SymptomHistory setShowHistory={setShowHistory} />
        ) : (
          <motion.div
            key="checker-view"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-5xl flex flex-col items-center z-10
              bg-gradient-to-br from-emerald-800/40 via-teal-800/30 to-green-700/40
              backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl
              p-4 sm:p-6 md:p-8 text-white"
          >
            {results.length === 0 ? (
              <motion.div
                key="input-view"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center text-center"
              >
                <FaStethoscope className="text-5xl sm:text-6xl mb-3 drop-shadow-xl text-teal-300 animate-pulse" />
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-green-300 to-cyan-300">
                  AI Symptom Checker
                </h1>
                <p className="text-base sm:text-lg text-gray-100 mb-6 max-w-lg sm:max-w-2xl drop-shadow-md">
                  Enter your symptoms, and our AI will suggest possible conditions.
                </p>

                {/* ✅ Input Section */}
                <SymptomInput
                  age={age}
                  setAge={setAge}
                  gender={gender}
                  setGender={setGender}
                  symptomsList={symptomsList}
                  setSymptomsList={setSymptomsList}
                  checkedPainAreas={checkedPainAreas}
                  setCheckedPainAreas={setCheckedPainAreas}
                  painDescriptions={painDescriptions}
                  setPainDescriptions={setPainDescriptions}
                  medication={medication}
                  setMedication={setMedication}
                  otherInfo={otherInfo}
                  setOtherInfo={setOtherInfo}
                />

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-8 w-full justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCheckSymptoms}
                    disabled={loading}
                    className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 
                      bg-gradient-to-r from-teal-400 via-green-400 to-cyan-500 
                      text-white font-bold rounded-full shadow-lg 
                      hover:opacity-90 transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <AiOutlineLoading3Quarters className="animate-spin" /> Checking...
                      </>
                    ) : (
                      "Check Symptoms"
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowHistory(true)}
                    className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 
                      bg-white/10 text-teal-200 font-bold rounded-full shadow-md 
                      hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                  >
                    <FaHistory /> View History
                  </motion.button>

                  {(symptomsList.length > 0 || error) && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleReset}
                      className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 
                        bg-red-500/20 text-cyan-300 font-bold rounded-full shadow-md 
                        hover:bg-red-500/30 transition-all flex items-center justify-center gap-2"
                    >
                      <MdOutlineClose /> Reset
                    </motion.button>
                  )}
                </div>

                {/* Error Message */}
                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 mt-4 font-semibold text-sm sm:text-base drop-shadow-md"
                  >
                    {error}
                  </motion.p>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="results-view"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full flex flex-col items-center"
              >
                <SymptomResults results={results} />
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-8 w-full justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReset}
                    className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 
                      bg-gradient-to-r from-teal-400 via-green-400 to-cyan-500 
                      text-white font-bold rounded-full shadow-lg 
                      hover:opacity-90 transition-all flex items-center justify-center gap-2"
                  >
                    <FaStethoscope /> Check New Symptoms
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowHistory(true)}
                    className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 
                      bg-white/10 text-teal-200 font-bold rounded-full shadow-md 
                      hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                  >
                    <FaHistory /> View History
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SymptomChecker;
