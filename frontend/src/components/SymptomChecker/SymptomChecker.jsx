import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStethoscope } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";
import API from "../../utils/Api";
import SymptomDisclaimer from "./SymptomDisclaimer";
import SymptomInput from "./SymptomInput";
import SymptomResults from "./SymptomResults";
import SymptomHistory from "./SymptomHistory";

const SymptomChecker = () => {
    const [symptomsInput, setSymptomsInput] = useState("");
    const [symptomsList, setSymptomsList] = useState([]);
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showDisclaimer, setShowDisclaimer] = useState(true);

    const handleAddSymptom = (e) => {
        if (e.key === "Enter" && symptomsInput.trim()) {
            e.preventDefault();
            setSymptomsList([...symptomsList, symptomsInput.trim()]);
            setSymptomsInput("");
        }
    };

    const handleRemoveSymptom = (index) => {
        setSymptomsList(symptomsList.filter((_, i) => i !== index));
    };

    const handleReset = () => {
        setSymptomsInput("");
        setSymptomsList([]);
        setAge("");
        setGender("");
        setResults([]);
        setError("");
        setLoading(false);
    };

    const handleCheckSymptoms = async () => {
        if (symptomsList.length === 0) {
            setError("⚠️ Please add at least one symptom.");
            return;
        }
        setError("");
        setLoading(true);
        setResults([]);

        try {
            const res = await API.post("/ai/diagnosis/check", { symptoms: symptomsList, age, gender });

            if (res.data && Array.isArray(res.data.conditions)) {
                setResults(res.data.conditions);

                // Save to localStorage history
                const newHistory = {
                    symptoms: symptomsList,
                    date: new Date().toLocaleString(),
                    age,
                    gender,
                    results: res.data.conditions,
                };
                const existing = JSON.parse(localStorage.getItem("symptomHistory")) || [];
                localStorage.setItem("symptomHistory", JSON.stringify([newHistory, ...existing]));
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
        <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12 text-white overflow-hidden">
            {/* ✅ Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-purple-800 to-pink-700 bg-[length:200%_200%] animate-[gradientShift_8s_ease_infinite]" />

            {/* ✅ Floating Circles */}
            <div className="absolute top-10 left-10 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-56 h-56 bg-pink-500/20 rounded-full blur-3xl animate-bounce"></div>

            {/* Disclaimer */}
            <SymptomDisclaimer show={showDisclaimer} onClose={() => setShowDisclaimer(false)} />

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center z-10"
            >
                <FaStethoscope className="text-6xl mb-3 drop-shadow-2xl animate-pulse" />
                <h1 className="text-5xl font-extrabold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400">
                    AI Symptom Checker
                </h1>
                <p className="text-lg text-white/80 mb-6 text-center max-w-2xl">
                    Enter your symptoms, and AI will suggest possible conditions.
                </p>
            </motion.div>

            {/* Inputs */}
            <SymptomInput
                age={age} setAge={setAge}
                gender={gender} setGender={setGender}
                symptomsInput={symptomsInput} setSymptomsInput={setSymptomsInput}
                symptomsList={symptomsList}
                handleAddSymptom={handleAddSymptom}
                handleRemoveSymptom={handleRemoveSymptom}
            />

            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-4">
                <motion.button
                    whileHover={{ scale: 1.1, rotate: 1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCheckSymptoms}
                    disabled={loading}
                    className="px-8 py-3 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 text-gray-900 font-bold rounded-full shadow-xl hover:shadow-pink-500/50 transition-all flex items-center gap-2 z-10"
                >
                    {loading ? (
                        <>
                            <AiOutlineLoading3Quarters className="animate-spin" /> Checking...
                        </>
                    ) : (
                        "Check Symptoms"
                    )}
                </motion.button>

                {(symptomsList.length > 0 || results.length > 0 || error) && (
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: -1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleReset}
                        className="px-8 py-3 bg-white/20 text-white font-bold rounded-full shadow-xl hover:shadow-white/20 transition-all flex items-center gap-2 z-10"
                    >
                        <MdOutlineClose /> Reset
                    </motion.button>
                )}
            </div>

            {/* Error */}
            {error && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-300 mt-4 font-semibold z-10"
                >
                    {error}
                </motion.p>
            )}

            {/* Results */}
            {results.length > 0 && <SymptomResults results={results} />}

            {/* History */}
            <SymptomHistory />
        </div>
    );
};

export default SymptomChecker;