import { MdHealthAndSafety } from "react-icons/md";
import { motion } from "framer-motion";
import renderUrgency from "./utils/renderUrgency";

// Possibility color levels
const getPossibilityLevel = (score) => {
  if (score >= 75) return { label: "High", color: "bg-red-500" };
  if (score >= 40) return { label: "Moderate", color: "bg-yellow-500" };
  return { label: "Low", color: "bg-green-500" };
};

const SymptomResults = ({ results }) => (
  <div className="relative w-full max-w-4xl z-10 p-6 md:p-8 rounded-2xl border border-white/10 bg-transparent">
    {/* Header */}
    <div className="w-full flex flex-col items-center mb-8">
      <MdHealthAndSafety className="text-5xl text-emerald-300 drop-shadow-lg" />
      <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mt-3 drop-shadow-md">
        Possible Conditions
      </h2>
    </div>

    {/* Results */}
    <div className="grid grid-cols-1 gap-6 w-full">
      {results.map((condition, index) => {
        const level = getPossibilityLevel(condition.possibility || 0);
        const urgency = renderUrgency(condition.urgency || "Non-Urgent");

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="relative w-full overflow-hidden rounded-2xl shadow-lg 
                       bg-gradient-to-br from-emerald-600/70 via-teal-600/70 to-green-700/70
                       border border-white/20 p-6 backdrop-blur-md transition-all"
          >
            <div className="relative flex flex-col gap-3 z-10">
              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-center 
                             rounded-xl bg-emerald-400/20 
                             text-emerald-200 text-2xl shadow-inner">
                🩺
              </div>

              {/* Name + Possibility + Urgency */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h3 className="text-2xl font-bold text-white drop-shadow-md">
                  {condition.name}
                </h3>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Possibility */}
                  <span
                    className={`text-sm font-semibold text-white px-2 py-1 rounded-full ${level.color}`}
                  >
                    {level.label} ({condition.possibility || 0}%)
                  </span>

                  {/* Urgency */}

                  <div className="flex items-center gap-2">
                    {renderUrgency(condition.urgency || condition.urgency_level || "Non-Urgent")}
                  </div>

                </div>
              </div>

              {/* Possibility bar */}
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${condition.possibility || 0}%` }}
                  transition={{ duration: 0.8 }}
                  className={`h-full ${level.color}`}
                />
              </div>

              {/* Description */}
              <p className="text-sm md:text-base text-gray-100 drop-shadow-md leading-relaxed">
                {condition.description}
              </p>

              {/* Recommended Doctor & First Step */}
              <div className="mt-4 border-t pt-4 border-white/10 space-y-2">
                <p className="text-base text-emerald-200 font-semibold">
                  👨‍⚕️ Recommended Doctor:{" "}
                  <span className="text-white font-normal">
                    {condition.recommended_doctor || "General Physician"}
                  </span>
                </p>

                <p className="text-base text-emerald-200 font-semibold">
                  🩹 First Step:{" "}
                  <span className="text-white font-normal">
                    {condition.first_step || "Consult a doctor for an evaluation."}
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
);

export default SymptomResults;
