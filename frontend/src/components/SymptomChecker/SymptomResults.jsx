import { motion } from "framer-motion";
import { MdHealthAndSafety } from "react-icons/md";
import renderUrgency from "./utils/renderUrgency";

const SymptomResults = ({ results }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    className="mt-12 w-full max-w-5xl bg-white/10 text-gray-800 shadow-2xl rounded-3xl p-10 backdrop-blur-xl border border-white/20 z-10"
  >
    <h2 className="text-4xl font-extrabold mb-10 flex items-center gap-3 text-white drop-shadow-lg">
      <MdHealthAndSafety className="text-5xl text-green-400 animate-bounce" />
      Possible Conditions
    </h2>

    <div className="grid md:grid-cols-2 gap-6 w-full">
      {results.map((condition, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          // ✅ Add hover animations for scale and rotation
          whileHover={{ scale: 1.05, rotate: 1 }}
          // ✅ Add group class for parent-child hover effects
          className="relative w-full overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-md border border-white/30 p-6 transition-all group"
        >
          {/* ✅ New Glowing Animation Border */}
          <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-pink-400 via-yellow-400 to-green-400 opacity-0 group-hover:opacity-100 animate-pulse"></div>
          
          <div className="relative flex flex-col gap-3 z-10">
            <div className="flex items-center justify-between">
              {/* ✅ Add scale animation on hover */}
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-green-100 text-green-600 text-2xl shadow-inner group-hover:scale-110 transition-transform">
                🩺
              </div>
              {renderUrgency(condition.urgency_level)}
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{condition.name}</h3>
            <p className="text-sm text-gray-800 leading-relaxed">{condition.description}</p>
            <div className="mt-4 border-t pt-4 border-gray-300">
              <strong className="text-lg text-gray-900">Next Steps:</strong>
              <p className="text-sm text-gray-700 mt-1">{condition.cta}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default SymptomResults;