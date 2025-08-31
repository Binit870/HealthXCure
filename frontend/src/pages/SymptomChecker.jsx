import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaStethoscope } from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ReactMarkdown from "react-markdown"; // ✅ for markdown parsing

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckSymptoms = async () => {
    if (!symptoms.trim()) {
      setError("⚠️ Please enter your symptoms first.");
      return;
    }
    setError("");
    setLoading(true);
    setResults([]);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/ai/diagnosis/check",
        {
          symptoms: symptoms.split(",").map((s) => s.trim()),
        }
      );

      let conditions = res.data.conditions;

      if (typeof conditions === "string") {
        conditions = conditions
          .split(/\d+\.\s+/)
          .map((c) => c.trim())
          .filter((c) => c.length > 0);
      }

      setResults(Array.isArray(conditions) ? conditions : [conditions]);
    } catch (err) {
      console.error(err);
      setError("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-800 text-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
        <FaStethoscope className="text-6xl mb-3 drop-shadow-lg" />
        <h1 className="text-4xl font-extrabold tracking-tight mb-3">
          AI Symptom Checker
        </h1>
        <p className="text-lg text-white/80 mb-6 text-center max-w-2xl">
          Enter your symptoms and let AI suggest possible conditions. Always
          consult a doctor for medical advice.
        </p>
      </motion.div>

      {/* Input */}
      <motion.textarea
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl border border-white/20 rounded-2xl p-4 mb-4 
        bg-white/10 backdrop-blur-md text-white placeholder-white/60 
        focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-xl"
        rows="4"
        placeholder="e.g., fever, headache, sore throat"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
      />

      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCheckSymptoms}
        className="px-8 py-3 bg-yellow-400 text-gray-900 font-bold 
        rounded-full shadow-lg hover:bg-yellow-300 transition-all 
        flex items-center gap-2"
        disabled={loading}
      >
        {loading ? (
          <>
            <AiOutlineLoading3Quarters className="animate-spin" /> Checking...
          </>
        ) : (
          "Check Symptoms"
        )}
      </motion.button>

      {/* Error Message */}
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-300 mt-4 font-semibold"
        >
          {error}
        </motion.p>
      )}

      {/* Results */}
      {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-12 w-full max-w-6xl bg-white/10 text-gray-800 shadow-2xl 
               rounded-3xl p-10 backdrop-blur-xl border border-white/20"
        >
          <h2 className="text-4xl font-extrabold mb-10 flex items-center gap-3 text-white drop-shadow-lg">
            <MdHealthAndSafety className="text-5xl text-green-400 animate-pulse" />
            Possible Conditions
          </h2>

          {/* Cards (now full width, one per row) */}
          <div className="flex flex-col gap-6 w-full">
            {results.map((condition, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.02 }}
                className="relative w-full overflow-hidden rounded-2xl shadow-xl 
                           bg-gradient-to-br from-white/90 to-white/70 
                           backdrop-blur-md border border-white/30 p-6 
                           hover:shadow-2xl transition-all group"
              >
                {/* Accent bar */}
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-green-400 to-blue-500"></div>

                <div className="flex flex-col gap-3">
                  {/* Icon */}
                  <div className="w-12 h-12 flex items-center justify-center 
                                  rounded-xl bg-green-100 text-green-600 text-2xl shadow-inner 
                                  group-hover:scale-110 transition-transform">
                    🩺
                  </div>

                  {/* Condition Text (markdown enabled) */}
                  <ReactMarkdown
                    components={{
                      p: ({ node, ...props }) => (
                        <p
                          {...props}
                          className="text-sm text-gray-800 leading-relaxed"
                        />
                      ),
                      strong: ({ node, ...props }) => (
                        <strong
                          {...props}
                          className="font-bold text-gray-900"
                        />
                      ),
                    }}
                  >
                    {condition}
                  </ReactMarkdown>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SymptomChecker;
