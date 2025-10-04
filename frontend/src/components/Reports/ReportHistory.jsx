import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineHistory, AiOutlineDown, AiOutlineFileText, AiOutlineDelete } from 'react-icons/ai';

const historyListVariants = {
  hidden: { opacity: 0, height: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.08,
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: 'easeIn' } },
};

const ReportHistory = ({ history, showHistory, setShowHistory, handleViewHistoryItem, handleDelete }) => {
  return (
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
  );
};

export default ReportHistory;