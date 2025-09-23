import React from "react";
import { motion } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cardVariants, itemVariants } from "./variants";

const DietForm = ({ formData, setFormData, generatePlan, handleFileChange, loading }) => {
  return (
    <motion.div
      key="form"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-cyan-600/80 backdrop-blur-xl px-4 sm:px-6 md:px-8 py-6 sm:py-8 rounded-3xl shadow-2xl w-full max-w-4xl border border-gray-700 relative overflow-hidden"
    >
      {/* Glow Decorations */}
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-teal-400/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Age, Gender, Height, Weight */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 relative z-10">
        <motion.input
          variants={itemVariants}
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          className="p-4 bg-gray-800 border border-cyan-700 text-white rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all text-sm sm:text-base w-full"
        />

        <motion.select
          variants={itemVariants}
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          className="p-4 bg-gray-800 border border-gray-700 text-white rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all text-sm sm:text-base w-full"
        >
          <option className="bg-gray-900 text-white">Male</option>
          <option className="bg-gray-900 text-white">Female</option>
          <option className="bg-gray-900 text-white">Other</option>
        </motion.select>

        <motion.input
          variants={itemVariants}
          type="number"
          placeholder="Height (cm)"
          value={formData.height}
          onChange={(e) => setFormData({ ...formData, height: e.target.value })}
          className="p-4 bg-gray-800 border border-gray-700 text-white rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all text-sm sm:text-base w-full"
        />

        <motion.input
          variants={itemVariants}
          type="number"
          placeholder="Weight (kg)"
          value={formData.weight}
          onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
          className="p-4 bg-gray-800 border border-gray-700 text-white rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all text-sm sm:text-base w-full"
        />
      </div>

      {/* Goal & Diet Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 relative z-10">
        <motion.select
          variants={itemVariants}
          value={formData.goal}
          onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
          className="p-4 bg-gray-800 border border-gray-700 text-white rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all text-sm sm:text-base w-full"
        >
          <option className="bg-gray-900 text-white">Weight Loss</option>
          <option className="bg-gray-900 text-white">Muscle Gain</option>
          <option className="bg-gray-900 text-white">Balanced Nutrition</option>
        </motion.select>

        <motion.select
          variants={itemVariants}
          value={formData.dietType}
          onChange={(e) => setFormData({ ...formData, dietType: e.target.value })}
          className="p-4 bg-gray-800 border border-gray-700 text-white rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all text-sm sm:text-base w-full"
        >
          <option className="bg-gray-900 text-white">Vegetarian</option>
          <option className="bg-gray-900 text-white">Vegan</option>
          <option className="bg-gray-900 text-white">Keto</option>
          <option className="bg-gray-900 text-white">Paleo</option>
          <option className="bg-gray-900 text-white">Non-Vegetarian</option>
        </motion.select>
      </div>

      {/* Reason */}
      <motion.div variants={itemVariants} className="mb-6 relative z-10 w-full">
        <label className="block mb-2 font-semibold text-white text-sm sm:text-base">Reason for Diet</label>
        <select
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          className="w-full p-4 bg-gray-800 border border-gray-700 text-white rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all text-sm sm:text-base"
        >
          <option className="bg-gray-900 text-white">General Health</option>
          <option className="bg-gray-900 text-white">Diabetes</option>
          <option className="bg-gray-900 text-white">PCOS</option>
          <option className="bg-gray-900 text-white">Heart Health</option>
          <option className="bg-gray-900 text-white">Other</option>
        </select>
      </motion.div>

      {/* Days */}
      <motion.div variants={itemVariants} className="mb-6 relative z-10 w-full">
        <label className="block mb-2 font-semibold text-white text-sm sm:text-base">Number of Days</label>
        <input
          type="number"
          value={formData.days}
          onChange={(e) => setFormData({ ...formData, days: e.target.value })}
          className="w-full p-4 bg-gray-800 border border-gray-700 text-white rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all text-sm sm:text-base"
          min="1"
        />
      </motion.div>

      {/* Preferences */}
      <motion.textarea
        variants={itemVariants}
        value={formData.preferences}
        onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
        placeholder="Extra notes (allergies, cuisine preferences...)"
        rows="3"
        className="w-full p-4 bg-gray-800 border border-gray-700 text-white rounded-xl mb-6 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all resize-y text-sm sm:text-base"
      />

      {/* Diseases */}
      <motion.textarea
        variants={itemVariants}
        value={formData.diseases}
        onChange={(e) => setFormData({ ...formData, diseases: e.target.value })}
        placeholder="Any medical conditions? (e.g., Hypertension, Celiac Disease...)"
        rows="3"
        className="w-full p-4 bg-gray-800 border border-gray-700 text-white rounded-xl mb-6 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all resize-y text-sm sm:text-base"
      />

      {/* Symptoms */}
      <motion.textarea
        variants={itemVariants}
        value={formData.symptoms}
        onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
        placeholder="Not feeling well? Describe your symptoms..."
        rows="3"
        className="w-full p-4 bg-gray-800 border border-gray-700 text-white rounded-xl mb-6 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all resize-y text-sm sm:text-base"
      />

      {/* Report Upload */}
      <motion.div variants={itemVariants} className="mb-6 relative z-10 w-full">
        <label className="block mb-2 font-semibold text-white text-sm sm:text-base">Upload Health Report (Optional)</label>
        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={(e) => handleFileChange(e.target.files[0])}
          className="w-full text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50/10 file:text-cyan-400 hover:file:bg-cyan-100/20"
        />
      </motion.div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={generatePlan}
        disabled={loading}
        className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed text-lg flex items-center justify-center"
      >
        {loading ? (
          <span className="flex items-center">
            <AiOutlineLoading3Quarters className="animate-spin mr-3 text-2xl text-white" />
            Generating Your Plan...
          </span>
        ) : (
          "✨ Generate My Personalized Diet Plan"
        )}
     

</motion.button>
    </motion.div>
  );
};

export default DietForm;