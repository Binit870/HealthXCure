import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHistory, FaVirus, FaChevronDown, FaTrash, FaStethoscope } from "react-icons/fa";
import renderUrgency from "./utils/renderUrgency";
import API from "../../utils/Api";

const getPossibilityLevel = (score) => {
  if (score >= 75) return { label: "High", color: "text-red-600 font-semibold" };
  if (score >= 40) return { label: "Moderate", color: "text-yellow-600 font-semibold" };
  return { label: "Low", color: "text-green-600 font-semibold" };
};

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
      className="mt-6 sm:mt-12 w-full max-w-5xl rounded-2xl sm:rounded-3xl 
                 p-4 sm:p-6 md:p-10 backdrop-blur-lg bg-white/30 
                 border border-white/30 shadow-2xl text-gray-900"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold flex items-center gap-3 text-gray-900 drop-shadow-sm">
          <FaHistory className="text-3xl sm:text-4xl md:text-5xl text-cyan-500" />
          Your Symptom History
        </h2>

        <button
          onClick={() => setShowHistory(false)}
          className="w-full sm:w-auto px-5 sm:px-6 py-2 bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-500 
                     text-white font-bold rounded-full shadow-md hover:opacity-90 transition-all 
                     flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          <FaStethoscope /> Check Symptoms
        </button>
      </div>

      {/* Status */}
      {loading && <p className="text-gray-700 text-center text-sm sm:text-base">Loading history...</p>}
      {error && <p className="text-red-500 text-center text-sm sm:text-base">{error}</p>}

      {/* Empty State */}
      {!loading && history.length === 0 ? (
        <p className="text-gray-700 text-center text-sm sm:text-base">
          No history available yet. Start by checking your first symptom!
        </p>
      ) : (
        <div className="flex flex-col gap-4 sm:gap-6">
          <AnimatePresence>
            {history.map((item, index) => (
              <motion.div
                key={item._id || index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => toggleExpand(index)}
                className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl 
                           bg-white/70 backdrop-blur-md border border-gray-200 p-5 sm:p-6 
                           shadow-lg cursor-pointer"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center 
                                    rounded-lg sm:rounded-xl bg-cyan-100 text-xl sm:text-2xl 
                                    text-cyan-600 shadow-inner">
                      <FaVirus />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Symptoms</h3>
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed break-words max-w-xs sm:max-w-md">
                        {item.symptoms.join(", ")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4 self-end sm:self-auto">
                    <span className="text-gray-600 text-xs sm:text-sm font-medium whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item._id);
                      }}
                      className="p-1.5 sm:p-2 rounded-md sm:rounded-lg bg-red-500 hover:bg-red-600 
                                 text-white transition text-sm shadow-sm"
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
                      className="text-base sm:text-lg text-cyan-600 cursor-pointer"
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
                      className="mt-4 sm:mt-6 border-t pt-4 sm:pt-6 border-gray-200 overflow-hidden"
                    >
                      <strong className="text-base sm:text-lg text-cyan-700">
                        Possible Conditions:
                      </strong>
                      <ul className="mt-3 sm:mt-4 space-y-3 sm:space-y-4">
                        {item.results.map((result, resIndex) => {
                          const level = getPossibilityLevel(result.chance_percent || 0);
                          return (
                            <li
                              key={resIndex}
                              className="bg-white/60 p-3 sm:p-4 rounded-lg border border-gray-200 backdrop-blur-sm"
                            >
                              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
  <span className="text-cyan-700 text-sm sm:text-base font-semibold">
    {result.name}
  </span>
  {renderUrgency(result.urgency)}
</div>

<p className="text-xs sm:text-sm text-gray-800">{result.description}</p>

<p className={`mt-1 text-xs sm:text-sm ${level.color}`}>
  Chance: {result.possibility || 0}%
</p>

<p className="text-xs sm:text-sm text-gray-800 mt-1">
  <strong className="text-cyan-700">Doctor:</strong>{" "}
  {result.recommended_doctor || "Specialist (based on symptoms)"}
</p>

{result.first_step && (
  <p className="text-xs sm:text-sm text-gray-800 mt-1">
    <strong className="text-cyan-700">First Step:</strong> {result.first_step}
  </p>
)}

                            </li>
                          );
                        })}
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
