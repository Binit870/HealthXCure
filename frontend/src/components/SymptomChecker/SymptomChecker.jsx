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
    // --- State Management (Unchanged) ---
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showDisclaimer, setShowDisclaimer] = useState(true);
    const [showHistory, setShowHistory] = useState(false);
    const [symptomsList, setSymptomsList] = useState([]);
    const [checkedPainAreas, setCheckedPainAreas] = useState([]);
    const [painDescriptions, setPainDescriptions] = useState("");
    const [medication, setMedication] = useState("");
    const [otherInfo, setOtherInfo] = useState("");

    // --- Handlers (Unchanged) ---
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

    // --- UI Redesign (Focus on single text color) ---
    return (
        <div
            className="relative min-h-screen flex flex-col items-center justify-start px-4 sm:px-6 md:px-8 py-10 sm:py-16 text-gray-800 overflow-hidden"
            style={{
                background: "linear-gradient(180deg, #F0FFF9 0%, #F5F7FF 100%)",
            }}
        >
            {/* Soft animated background accents (Unchanged) */}
            <div className="absolute top-10 left-8 w-28 h-28 bg-teal-100/60 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-16 right-8 w-36 h-36 bg-indigo-100/60 rounded-full blur-3xl animate-bounce"></div>

            {/* Disclaimer Modal (Unchanged) */}
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
                        className="w-full max-w-4xl flex flex-col items-center z-10"
                    >
                        {results.length === 0 ? (
                            <motion.div
                                key="input-view"
                                initial={{ opacity: 0, y: -30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="flex flex-col items-center text-center bg-cyan-100 border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-xl w-full max-w-4xl"
                            >
                                {/* Icon and Header */}
                                <FaStethoscope className="text-5xl sm:text-6xl mb-4 text-teal-500" />
                                {/* REVISED: Single text color (Teal-700) instead of gradient */}
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-2 text-teal-500 font-sans">
                                    AI Symptom Checker
                                </h1>
                                <p className="text-base sm:text-lg text-gray-500 mb-8 max-w-2xl font-light">
                                    Enter your symptoms, and our AI will suggest possible conditions.
                                </p>

                                {/* Input Section (Unchanged) */}
                                <SymptomInput
                                    age={age} setAge={setAge}
                                    gender={gender} setGender={setGender}
                                    symptomsList={symptomsList} setSymptomsList={setSymptomsList}
                                    checkedPainAreas={checkedPainAreas} setCheckedPainAreas={setCheckedPainAreas}
                                    painDescriptions={painDescriptions} setPainDescriptions={setPainDescriptions}
                                    medication={medication} setMedication={setMedication}
                                    otherInfo={otherInfo} setOtherInfo={setOtherInfo}
                                />

                                {/* Buttons Container (Unchanged) */}
                                <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-10 w-full justify-center">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleCheckSymptoms}
                                        disabled={loading}
                                        className="w-full sm:w-auto px-8 py-3 bg-teal-500 text-white font-bold rounded-full shadow-lg shadow-teal-300/50 hover:bg-teal-600 transition-all duration-300 flex items-center justify-center gap-2 text-lg"
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
                                        className="w-full sm:w-auto px-8 py-3 bg-white border border-teal-200 text-teal-600 font-semibold rounded-full hover:bg-teal-50 shadow-md transition-all duration-300 flex items-center justify-center gap-2 text-lg"
                                    >
                                        <FaHistory /> View History
                                    </motion.button>

                                    {(symptomsList.length > 0 || error) && (
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleReset}
                                            className="w-full sm:w-auto px-8 py-3 bg-white border border-red-300 text-red-600 font-semibold rounded-full hover:bg-red-50 shadow-md transition-all duration-300 flex items-center justify-center gap-2 text-lg"
                                        >
                                            <MdOutlineClose /> Reset
                                        </motion.button>
                                    )}
                                </div>

                                {/* Error Message (Unchanged) */}
                                {error && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-red-500 mt-6 font-medium text-base sm:text-lg bg-red-50 p-3 rounded-xl border border-red-200"
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
                                className="w-full flex flex-col items-center bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-xl"
                            >
                                <SymptomResults results={results} />
                                <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-10 w-full justify-center">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleReset}
                                        className="w-full sm:w-auto px-8 py-3 bg-teal-500 text-white font-bold rounded-full shadow-lg shadow-teal-300/50 hover:bg-teal-600 transition-all duration-300 flex items-center justify-center gap-2 text-lg"
                                    >
                                        <FaStethoscope /> Check New Symptoms
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setShowHistory(true)}
                                        className="w-full sm:w-auto px-8 py-3 bg-white border border-teal-200 text-teal-600 font-semibold rounded-full hover:bg-teal-50 shadow-md transition-all duration-300 flex items-center justify-center gap-2 text-lg"
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