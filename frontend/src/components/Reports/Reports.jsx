import React, { useState, useEffect } from "react";
import API from "../../utils/Api";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdDescription } from "react-icons/md";
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
  const [isMobile, setIsMobile] = useState(false);

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

    // Detect if the user is on mobile
    const checkMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    setIsMobile(checkMobile);
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

  // Mobile camera capture handler
  const handleCapturePhoto = (e) => {
    const capturedFile = e.target.files[0];
    if (capturedFile) setFile(capturedFile);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col items-center p-4 md:p-8 py-12 font-sans relative overflow-hidden">
      {/* Floating background glow (REMOVED: To keep the background simple white) */}
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        // Changed styling for a simple white box with a subtle shadow and teal border
        className="bg-white shadow-xl rounded-2xl p-6 md:p-10 w-full max-w-3xl border-t-4 border-teal-500 relative z-10"
      >
        {/* Header with clear button */}
        <div className="mb-4 flex flex-col items-center justify-center text-center space-y-2">
          <div className="flex items-center justify-center space-x-3">
            <MdDescription className="text-teal-500 text-3xl md:text-4xl" />
            {/* Title uses a strong teal color */}
            <h1 className="text-3xl md:text-4xl font-extrabold text-teal-600">
              Medical Report Analyzer
            </h1>
          </div>

          <AnimatePresence>
            {result && (
              <motion.button
                key="clear-btn"
                onClick={clearCurrentView}
                // Teal text that hovers to red
                className="flex items-center text-sm text-teal-600 hover:text-red-600 transition"
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
        <p className="text-gray-600 text-center mb-6 md:mb-8 text-sm md:text-base leading-relaxed">
          Upload your <span className="text-teal-600 font-semibold">report (PDF/Image)</span>.
          Our AI will <span className="text-teal-600 font-semibold">analyze</span> and explain it in simple,
          easy-to-understand terms.
        </p>

        {/* Upload / Result */}
        <AnimatePresence mode="wait">
          {!result ? (
            <div className="flex flex-col items-center space-y-3">
              {/* NOTE: ReportUpload component needs internal styling updates for teal theme */}
              <ReportUpload
                file={file}
                loading={loading}
                handleFileChange={handleFileChange}
                handleClearFile={handleClearFile}
                handleUpload={handleUpload}
              />

              {/* 📷 Mobile Camera Button - Changed to use a solid teal look */}
              {isMobile && (
                <label className="cursor-pointer text-white bg-teal-600 px-4 py-2 rounded-xl hover:bg-teal-700 transition-all text-sm shadow-md">
                  📷 Scan Using Camera
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleCapturePhoto}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          ) : (
            // NOTE: ReportResult component needs internal styling updates for teal theme
            <ReportResult result={result} selectedHistoryItem={selectedHistoryItem} />
          )}
        </AnimatePresence>
      </motion.div>

      {/* History Section */}
      {history.length > 0 && (
        // NOTE: ReportHistory component needs internal styling updates for teal theme
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