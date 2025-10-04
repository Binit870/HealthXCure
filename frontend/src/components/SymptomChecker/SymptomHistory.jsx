import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHistory, FaVirus, FaChevronDown, FaTrash, FaStethoscope } from "react-icons/fa";
import renderUrgency from "./utils/renderUrgency";
import API from "../../utils/Api";

const SymptomHistory = ({ setShowHistory }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await API.get("/symptoms/history");
        setHistory(res.data.history);
        setLoading(false);
      } catch (err) {
        setError("Failed to load history.");
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/symptoms/history/${id}`);
      setHistory((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Failed to delete entry", err);
      alert("Failed to delete entry. Try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="mt-6 sm:mt-12 w-full max-w-5xl text-white rounded-2xl sm:rounded-3xl 
                 p-4 sm:p-6 md:p-10 backdrop-blur-xl z-10 
                 bg-gradient-to-br from-cyan-900 via-cyan-800 to-cyan-700 shadow-2xl"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold flex items-center gap-3 text-white drop-shadow-lg">
          <FaHistory className="text-3xl sm:text-4xl md:text-5xl text-cyan-400 animate-pulse" />
          Your Symptom History
        </h2>

        {/* ✅ Back button */}
        <button
          onClick={() => setShowHistory(false)}
          className="w-full sm:w-auto px-5 sm:px-6 py-2 bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 
                     text-gray-900 font-bold rounded-full shadow-xl hover:shadow-cyan-500/50 
                     transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          <FaStethoscope /> Check Your Symptoms
        </button>
      </div>

      {/* Status */}
      {loading && <p className="text-gray-200 text-center text-sm sm:text-base">Loading history...</p>}
      {error && <p className="text-red-400 text-center text-sm sm:text-base">{error}</p>}

      {/* Empty State */}
      {!loading && history.length === 0 ? (
        <p className="text-gray-200 text-center text-sm sm:text-base">
          No history available yet. Check your first symptom to see it here!
        </p>
      ) : (
        <div className="flex flex-col gap-4 sm:gap-6">
          <AnimatePresence>
            {history.map((item, index) => (
              <motion.div
                key={item._id || index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.01 }}
                onClick={() => toggleExpand(index)}
                className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl shadow-xl 
                           bg-slate-900 border border-cyan-500/50 p-4 sm:p-6 
                           transition-all cursor-pointer group"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-transparent 
                                bg-gradient-to-r from-cyan-800 to-emerald-800 
                                opacity-0 group-hover:opacity-100 blur-sm transition" />

                {/* Header Row */}
                <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center 
                                    rounded-lg sm:rounded-xl bg-gray-800 text-xl sm:text-2xl shadow-inner 
                                    group-hover:scale-110 transition-transform text-cyan-400">
                      <FaVirus />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">Symptoms</h3>
                      <p className="text-xs sm:text-sm text-white leading-relaxed break-words max-w-xs sm:max-w-md">
                        {item.symptoms.join(", ")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4 self-end sm:self-auto">
                    <span className="text-white text-xs sm:text-sm font-semibold whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item._id);
                      }}
                      className="p-1.5 sm:p-2 rounded-md sm:rounded-lg bg-red-600 hover:bg-red-700 
                                 text-white transition shadow-md text-sm"
                    >
                      <FaTrash />
                    </button>

                    <motion.div
                      animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(index);
                      }}
                      className="text-base sm:text-lg text-cyan-400 cursor-pointer"
                    >
                      <FaChevronDown />
                    </motion.div>
                  </div>
                </div>

                {/* Expanded Section */}
                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="mt-4 sm:mt-6 border-t pt-4 sm:pt-6 border-white/20 overflow-hidden relative z-10"
                    >
                      <strong className="text-base sm:text-lg text-white">
                        Possible Conditions:
                      </strong>
                      <ul className="mt-3 sm:mt-4 space-y-3 sm:space-y-4">
                        {item.results.map((result, resIndex) => (
                          <li
                            key={resIndex}
                            className="bg-slate-800 p-3 sm:p-4 rounded-lg border border-cyan-500/40"
                          >
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
                              <span className="text-cyan-300 text-sm sm:text-base font-semibold">
                                {result.name}
                              </span>
                              {renderUrgency(result.urgency_level)}
                            </div>
                            <p className="text-xs sm:text-sm text-gray-100">{result.description}</p>
                            {result.treatments && (
                              <p className="text-xs sm:text-sm text-gray-100 mt-2">
                                <strong className="text-white">Treatments:</strong>{" "}
                                {result.treatments}
                              </p>
                            )}
                            {result.medicine && (
                              <p className="text-xs sm:text-sm text-gray-100 mt-1">
                                <strong className="text-white">Medicine:</strong>{" "}
                                {result.medicine}
                              </p>
                            )}
                            <p className="text-xs sm:text-sm mt-2 font-medium text-cyan-200">
                              {result.cta}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

export default SymptomHistory;
