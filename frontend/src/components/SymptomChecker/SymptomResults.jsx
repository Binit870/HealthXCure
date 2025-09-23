import { motion } from "framer-motion";
import { MdHealthAndSafety } from "react-icons/md";
import renderUrgency from "./utils/renderUrgency";

const SymptomResults = ({ results }) => (
  <div className="relative w-full max-w-5xl z-10 p-4 sm:p-6 md:p-10 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 shadow-2xl">
    {/* Header */}
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-10 w-full flex flex-col items-center mb-6 sm:mb-8 md:mb-10"
    >
      <MdHealthAndSafety className="text-4xl sm:text-5xl animate-bounce text-cyan-400 drop-shadow-lg" />
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold flex items-center gap-3 text-white drop-shadow-lg text-center mt-2 sm:mt-3">
        Possible Conditions
      </h2>
    </motion.div>

    {/* Results Grid */}
    <div className="relative z-10 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-6 w-full">
        {results.map((condition, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl shadow-xl bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-md border border-white/30 p-4 sm:p-6 md:p-6 transition-all group"
          >
            {/* Glowing border on hover */}
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-transparent bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400 opacity-0 group-hover:opacity-100 animate-pulse"></div>

            {/* Content */}
            <div className="relative flex flex-col gap-3 z-10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg sm:rounded-xl bg-cyan-100 text-cyan-600 text-xl sm:text-2xl shadow-inner group-hover:scale-110 transition-transform">
                🩺
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{condition.name}</h3>
                <div className="mt-1 sm:mt-0">{renderUrgency(condition.urgency_level)}</div>
              </div>
              <p className="text-xs sm:text-sm md:text-base text-gray-800 leading-relaxed">{condition.description}</p>
              <div className="mt-3 sm:mt-4 border-t pt-3 sm:pt-4 border-gray-300">
                <strong className="text-base sm:text-lg md:text-lg text-gray-900">Next Steps:</strong>
                <p className="text-xs sm:text-sm md:text-sm text-gray-700 mt-1">{condition.cta}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default SymptomResults;
