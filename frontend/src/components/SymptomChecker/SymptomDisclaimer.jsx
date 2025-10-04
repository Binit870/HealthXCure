import { motion, AnimatePresence } from "framer-motion";

const SymptomDisclaimer = ({ show, onClose }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          // Added responsive padding and rounded corners for better mobile adaptation.
          className="bg-white/90 p-6 sm:p-8 rounded-2xl sm:rounded-3xl max-w-lg w-full text-gray-800 shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Adjusted font size for responsiveness */}
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Medical Disclaimer 🚨</h2>
          <p className="mb-4">
            This AI Symptom Checker is for informational purposes only and is <strong>not a substitute for professional medical advice</strong>.
          </p>
          <p className="font-semibold text-sm mb-6">
            Always consult with a qualified healthcare provider for any health concerns.
          </p>
          <button
            onClick={onClose}
            className="bg-cyan-600 text-white font-bold py-2 px-6 rounded-full w-full transition-transform hover:scale-105"
          >
            I Understand
          </button>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default SymptomDisclaimer;
