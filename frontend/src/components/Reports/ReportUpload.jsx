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
          {file ? file.name : 'Click to select a file'}
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
        {file && file.type.startsWith('image/') && (
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
        {loading ? 'Analyzing Report...' : 'Upload & Analyze'}
      </motion.button>
    </motion.div>
  );
};

export default ReportUpload;