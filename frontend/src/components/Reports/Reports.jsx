import React, { useState, useEffect } from "react";
import API from "../../utils/Api";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineCloseCircle } from "react-icons/ai";

// Import the smaller components
import ReportUpload from "./ReportUpload";
import ReportResult from "./ReportResult";
import ReportHistory from "./ReportHistory";

const Reports = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);

  const fetchHistory = async () => {
    try {
      const res = await API.get("/reports/history");
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
    if (selectedFile) setFile(selectedFile);
  };

  const handleClearFile = () => setFile(null);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setSelectedHistoryItem(null);
      const res = await API.post("/reports/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data.explanation);
      fetchHistory();
    } catch (err) {
      console.error(err);
      alert("Something went wrong while analyzing the report.");
    } finally {
      setLoading(false);
      setFile(null);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    const confirmed = window.confirm("Are you sure you want to delete this report?");
    if (!confirmed) return;

    try {
      await API.delete(`/reports/delete/${id}`);
      setHistory((prev) => prev.filter((item) => item._id !== id));
      if (selectedHistoryItem && selectedHistoryItem._id === id) {
        clearCurrentView();
      }
    } catch (err) {
      console.error("Error deleting report:", err);
      alert("Failed to delete report.");
    }
  };

  const handleViewHistoryItem = (item) => {
    setSelectedHistoryItem(item);
    setResult(item.explanation);
    setShowHistory(false);
  };

  const clearCurrentView = () => {
    setResult("");
    setSelectedHistoryItem(null);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 text-gray-100 flex flex-col items-center p-4 md:p-8 py-12 font-sans relative overflow-hidden">
      {/* Floating background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-400/20 blur-3xl rounded-full animate-pulse delay-2000" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-gray-800/80 backdrop-blur-2xl shadow-2xl rounded-3xl p-6 md:p-10 w-full max-w-3xl border border-gray-700/70 relative z-10"
      >
        {/* Header with clear button */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl  md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            🧾 Medical Report Analyzer
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

        {/* Instructions */}
        <p className="text-gray-300 text-center mb-6 md:mb-8 text-sm md:text-base leading-relaxed">
          Upload your <span className="text-blue-400 font-semibold">report (PDF/Image)</span>.  
          Our AI will <span className="text-cyan-300 font-semibold">analyze</span> and explain it in simple, 
          easy-to-understand terms.
        </p>

        {/* Upload / Result */}
        <AnimatePresence mode="wait">
          {!result ? (
            <ReportUpload
              file={file}
              loading={loading}
              handleFileChange={handleFileChange}
              handleClearFile={handleClearFile}
              handleUpload={handleUpload}
            />
          ) : (
            <ReportResult result={result} selectedHistoryItem={selectedHistoryItem} />
          )}
        </AnimatePresence>
      </motion.div>

      {/* History Section */}
      {history.length > 0 && (
        <ReportHistory
          history={history}
          showHistory={showHistory}
          setShowHistory={setShowHistory}
          handleViewHistoryItem={handleViewHistoryItem}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Reports;
