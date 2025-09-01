import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  AiOutlineUpload,
  AiOutlineLoading3Quarters,
  AiOutlineDown,
  AiOutlineCloseCircle,
  AiOutlineFileText,
  AiOutlineDelete,
  AiOutlineHistory, // Added for history button icon
} from "react-icons/ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Reports = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  // hideUpload is now derived from 'result' state
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);

  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/reports/history");
      setHistory(res.data);
    } catch (err) {
      console.error("Error fetching history:", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleClearFile = () => {
    setFile(null);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setSelectedHistoryItem(null); // Clear previous selection
      const res = await axios.post(
        "http://localhost:5000/api/reports/analyze",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setResult(res.data.explanation);
      fetchHistory(); // Refresh history after successful upload
    } catch (err) {
      console.error(err);
      alert("Something went wrong while analyzing the report.");
    } finally {
      setLoading(false);
      setFile(null);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation(); // Prevents click from bubbling up to parent history item

    const confirmed = window.confirm("Are you sure you want to delete this report?");
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:5000/api/reports/delete/${id}`);
      setHistory((prev) => prev.filter((item) => item._id !== id));
      if (selectedHistoryItem && selectedHistoryItem._id === id) {
        clearCurrentView(); // Clear the displayed result if the deleted item was being viewed
      }
    } catch (err) {
      console.error("Error deleting report:", err);
      alert("Failed to delete report.");
    }
  };

  const handleViewHistoryItem = (item) => {
    setSelectedHistoryItem(item);
    setResult(item.explanation);
    setShowHistory(false); // Hide history list after selecting an item
  };

  const clearCurrentView = () => {
    setResult("");
    setSelectedHistoryItem(null);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeIn" } },
  };

  const historyListVariants = {
    hidden: { opacity: 0, height: 0, transition: { duration: 0.3, ease: "easeOut" } },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.08, // Stagger history items appearance
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100 flex flex-col items-center p-4 md:p-8 py-12 font-sans">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-gray-800 shadow-2xl rounded-3xl p-6 md:p-10 w-full max-w-3xl border border-gray-700"
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-400">
            Medical Report AI Analyzer
          </h1>
          <AnimatePresence>
            {result && (
              <motion.button
                key="clear-btn"
                onClick={clearCurrentView}
                className="flex items-center text-sm text-gray-400 hover:text-red-400 transition"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AiOutlineCloseCircle className="mr-1" />
                Clear
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        <p className="text-gray-400 text-center mb-6 md:mb-8 text-sm md:text-base">
          Upload your report (PDF/Image). Our AI will analyze and explain it in simple, easy-to-understand terms.
        </p>

        <AnimatePresence mode="wait">
          {!result ? ( // Only show upload section if there's no result
            <motion.div
              key="upload-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="relative flex flex-col items-center border-2 border-dashed border-blue-600 rounded-2xl p-6 md:p-10 bg-gray-700 hover:bg-gray-600 transition cursor-pointer">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                  id="fileInput"
                />
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer text-blue-400 font-semibold md:text-lg hover:underline flex flex-col items-center"
                >
                  <AiOutlineUpload className="text-blue-400 text-5xl md:text-6xl mb-3 md:mb-4" />
                  {file ? file.name : "Click to select a file"}
                </label>

                {file && (
                  <motion.button
                    onClick={handleClearFile}
                    className="absolute top-2 right-2 text-gray-300 hover:text-red-400 transition-colors z-10"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <AiOutlineCloseCircle size={24} />
                  </motion.button>
                )}
                {file && file.type.startsWith("image/") && (
                  <motion.img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="mt-4 max-h-64 rounded-xl shadow-md border border-gray-600"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>

              <motion.button
                onClick={handleUpload}
                disabled={loading || !file}
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold py-3 md:py-4 rounded-2xl shadow-lg hover:from-blue-700 hover:to-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {loading && (
                  <AiOutlineLoading3Quarters className="animate-spin mr-2 text-lg md:text-xl" />
                )}
                {loading ? "Analyzing Report..." : "Upload & Analyze"}
              </motion.button>
            </motion.div>
          ) : (
            // Only show result section if there is a result
            <motion.div
              key="result-section"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="mt-8 p-6 md:p-8 bg-gray-700/70 backdrop-blur-lg rounded-2xl border border-gray-600 shadow-xl"
            >
              <h2 className="text-xl md:text-2xl font-semibold text-gray-200 mb-4 text-center">
                Report Summary
              </h2>
              {selectedHistoryItem && (
                <div className="text-center text-sm text-gray-400 mb-4">
                  Viewing summary for:{" "}
                  <span className="font-medium text-blue-400">
                    {selectedHistoryItem.name}
                  </span>
                </div>
              )}
              <div className="prose prose-invert max-w-full mx-auto leading-relaxed text-gray-300">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {result}
                </ReactMarkdown>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {history.length > 0 && (
        <div className="w-full max-w-3xl mt-8">
          <motion.button
            onClick={() => setShowHistory(!showHistory)}
            className="w-full bg-gradient-to-r from-purple-700 to-indigo-700 text-white font-semibold py-3 md:py-4 rounded-2xl shadow-xl hover:from-purple-800 hover:to-indigo-800 transition flex justify-between items-center px-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-lg md:text-xl flex items-center">
              <AiOutlineHistory className="mr-2 text-2xl" /> View Upload History ({history.length})
            </span>
            <motion.div
              initial={false}
              animate={{ rotate: showHistory ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <AiOutlineDown className="text-2xl" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {showHistory && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={historyListVariants}
                className="mt-4 space-y-4 overflow-hidden"
              >
                {history.map((item) => (
                  <motion.div
                    key={item._id}
                    className="flex justify-between items-center p-4 md:p-6 bg-gray-800 rounded-2xl shadow-md border border-gray-700 cursor-pointer hover:shadow-lg hover:border-indigo-500 transition transform hover:-translate-y-1"
                    onClick={() => handleViewHistoryItem(item)}
                    variants={itemVariants}
                  >
                    <div className="flex items-center flex-grow min-w-0">
                      <AiOutlineFileText className="text-indigo-400 mr-2 text-xl md:text-2xl flex-shrink-0" />
                      <span className="font-medium text-gray-100 text-sm md:text-base truncate">
                        {item.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
                      <span className="text-gray-400 text-xs md:text-sm">
                        {new Date(item.createdAt).toLocaleString()}
                      </span>
                      <motion.button
                        onClick={(e) => handleDelete(e, item._id)}
                        className="text-red-400 hover:text-red-600 transition"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        title="Delete report"
                      >
                        <AiOutlineDelete className="text-lg md:text-xl" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Reports;