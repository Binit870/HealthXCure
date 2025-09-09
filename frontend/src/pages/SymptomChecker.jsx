import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaStethoscope } from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ReactMarkdown from "react-markdown";
import API from "../utils/Api";

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
      const res = await API.post("/ai/diagnosis/check", {
        symptoms: symptoms.split(",").map((s) => s.trim()),
      });

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
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12 text-white overflow-hidden">
      {/* Animated Gradient Background (Tailwind native way) */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-purple-800 to-pink-700 bg-[length:200%_200%] animate-[gradientShift_8s_ease_infinite]" />

      {/* Floating Circles */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-56 h-56 bg-pink-500/20 rounded-full blur-3xl animate-bounce"></div>

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
          Enter your symptoms and let AI suggest possible conditions. Always
          consult a doctor for medical advice.
        </p>
      </motion.div>

      {/* Input */}
      <motion.textarea
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-2xl border border-white/30 rounded-2xl p-4 mb-4 
        bg-white/10 backdrop-blur-lg text-white placeholder-white/60 
        focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-2xl"
        rows="4"
        placeholder="e.g., fever, headache, sore throat"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
      />

      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleCheckSymptoms}
        className="px-8 py-3 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 text-gray-900 font-bold 
        rounded-full shadow-xl hover:shadow-pink-500/50 transition-all 
        flex items-center gap-2 z-10"
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-12 w-full max-w-5xl bg-white/10 text-gray-800 shadow-2xl 
               rounded-3xl p-10 backdrop-blur-xl border border-white/20 z-10"
        >
          <h2 className="text-4xl font-extrabold mb-10 flex items-center gap-3 text-white drop-shadow-lg">
            <MdHealthAndSafety className="text-5xl text-green-400 animate-bounce" />
            Possible Conditions
          </h2>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-6 w-full">
            {results.map((condition, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05, rotate: 1 }}
                className="relative w-full overflow-hidden rounded-2xl shadow-xl 
                           bg-gradient-to-br from-white/80 to-white/60 
                           backdrop-blur-md border border-white/30 p-6 
                           hover:shadow-2xl transition-all group"
              >
                {/* Glow Animation Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-pink-400 via-yellow-400 to-green-400 opacity-0 group-hover:opacity-100 animate-pulse"></div>

                <div className="relative flex flex-col gap-3 z-10">
                  <div className="w-12 h-12 flex items-center justify-center 
                                  rounded-xl bg-green-100 text-green-600 text-2xl shadow-inner 
                                  group-hover:scale-110 transition-transform">
                    🩺
                  </div>

                  {/* Condition Text */}
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
