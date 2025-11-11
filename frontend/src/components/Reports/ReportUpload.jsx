import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AiOutlineUpload,
  AiOutlineLoading3Quarters,
  AiOutlineCloseCircle,
} from 'react-icons/ai';

const ReportUpload = ({ file, loading, handleFileChange, handleClearFile, handleUpload }) => {
  return (
    <motion.div
      key="upload-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {/* Updated border and background for teal theme */}
      <div className="relative flex flex-col items-center border-2 border-dashed border-teal-400 rounded-2xl p-6 md:p-10 bg-gray-50 hover:bg-gray-100 transition cursor-pointer shadow-inner">
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          // Teal text for upload prompt
          className="cursor-pointer text-teal-600 font-semibold md:text-lg hover:text-teal-700 transition flex flex-col items-center"
        >
          <AiOutlineUpload className="text-teal-500 text-5xl md:text-6xl mb-3 md:mb-4" />
          {file ? file.name : 'Click to select a file'}
        </label>

        {file && (
          <motion.button
            onClick={handleClearFile}
            // Teal close button that hovers to red
            className="absolute top-2 right-2 text-teal-600 hover:text-red-600 transition-colors z-10"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <AiOutlineCloseCircle size={24} />
          </motion.button>
        )}
        {file && file.type.startsWith('image/') && (
          <motion.img
            src={URL.createObjectURL(file)}
            alt="Preview"
            // Simple white border
            className="mt-4 max-h-64 rounded-xl shadow-md border border-gray-200"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </div>

      <motion.button
        onClick={handleUpload}
        disabled={loading || !file}
        // Solid teal button
        className="w-full mt-6 bg-teal-600 text-white font-semibold py-3 md:py-4 rounded-2xl shadow-lg hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        {loading && (
          <AiOutlineLoading3Quarters className="animate-spin mr-2 text-lg md:text-xl" />
        )}
        {loading ? 'Analyzing Report...' : 'Upload & Analyze'}
      </motion.button>
    </motion.div>
  );
};

export default ReportUpload;