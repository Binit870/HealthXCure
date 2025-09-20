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
      className="bg-gray-900/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl 
                 w-full max-w-4xl border border-gray-700 relative overflow-hidden"
    >
      {/* Glow Decorations */}
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-green-500/20 
                      rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-blue-500/20 
                      rounded-full blur-3xl animate-pulse"></div>

      {/* Age, Gender, Height, Weight */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 relative z-10">
        <motion.input
          variants={itemVariants}
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          className="p-4 bg-gray-800 border border-gray-700 text-gray-200 
                     rounded-xl focus:ring-2 focus:ring-green-400 
                     focus:border-transparent transition-all"
        />

        <motion.select
          variants={itemVariants}
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          className="p-4 bg-gray-800 border border-gray-700 text-gray-200 
                     rounded-xl focus:ring-2 focus:ring-green-400 
                     focus:border-transparent transition-all"
        >
          <option className="bg-gray-900">Male</option>
          <option className="bg-gray-900">Female</option>
          <option className="bg-gray-900">Other</option>
        </motion.select>

        <motion.input
          variants={itemVariants}
          type="number"
          placeholder="Height (cm)"
          value={formData.height}
          onChange={(e) => setFormData({ ...formData, height: e.target.value })}
          className="p-4 bg-gray-800 border border-gray-700 text-gray-200 
                     rounded-xl focus:ring-2 focus:ring-blue-400 
                     focus:border-transparent transition-all"
        />

        <motion.input
          variants={itemVariants}
          type="number"
          placeholder="Weight (kg)"
          value={formData.weight}
          onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
          className="p-4 bg-gray-800 border border-gray-700 text-gray-200 
                     rounded-xl focus:ring-2 focus:ring-blue-400 
                     focus:border-transparent transition-all"
        />
      </div>

      {/* Goal & Diet Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 relative z-10">
        <motion.select
          variants={itemVariants}
          value={formData.goal}
          onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
          className="p-4 bg-gray-800 border border-gray-700 text-gray-200 
                     rounded-xl focus:ring-2 focus:ring-green-400 
                     focus:border-transparent transition-all"
        >
          <option className="bg-gray-900">Weight Loss</option>
          <option className="bg-gray-900">Muscle Gain</option>
          <option className="bg-gray-900">Balanced Nutrition</option>
        </motion.select>

        <motion.select
          variants={itemVariants}
          value={formData.dietType}
          onChange={(e) => setFormData({ ...formData, dietType: e.target.value })}
          className="p-4 bg-gray-800 border border-gray-700 text-gray-200 
                     rounded-xl focus:ring-2 focus:ring-green-400 
                     focus:border-transparent transition-all"
        >
          <option className="bg-gray-900">Vegetarian</option>
          <option className="bg-gray-900">Vegan</option>
          <option className="bg-gray-900">Keto</option>
          <option className="bg-gray-900">Paleo</option>
          <option className="bg-gray-900">Non-Vegetarian</option>
        </motion.select>
      </div>

      {/* Reason */}
      <motion.div variants={itemVariants} className="mb-6 relative z-10">
        <label className="block mb-2 font-semibold text-gray-300">Reason for Diet</label>
        <select
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          className="w-full p-4 bg-gray-800 border border-gray-700 text-gray-200 
                     rounded-xl focus:ring-2 focus:ring-green-400 
                     focus:border-transparent transition-all"
        >
          <option className="bg-gray-900">General Health</option>
          <option className="bg-gray-900">Diabetes</option>
          <option className="bg-gray-900">PCOS</option>
          <option className="bg-gray-900">Heart Health</option>
          <option className="bg-gray-900">Other</option>
        </select>
      </motion.div>

      {/* Days */}
      <motion.div variants={itemVariants} className="mb-6 relative z-10">
        <label className="block mb-2 font-semibold text-gray-300">Number of Days</label>
        <input
          type="number"
          value={formData.days}
          onChange={(e) => setFormData({ ...formData, days: e.target.value })}
          className="w-full p-4 bg-gray-800 border border-gray-700 text-gray-200 
                     rounded-xl focus:ring-2 focus:ring-green-400 
                     focus:border-transparent transition-all"
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
        className="w-full p-4 bg-gray-800 border border-gray-700 text-gray-200 
                   rounded-xl mb-6 focus:ring-2 focus:ring-green-400 
                   focus:border-transparent transition-all resize-y relative z-10"
      />

      {/* Diseases */}
      <motion.textarea
        variants={itemVariants}
        value={formData.diseases}
        onChange={(e) => setFormData({ ...formData, diseases: e.target.value })}
        placeholder="Any medical conditions? (e.g., Hypertension, Celiac Disease...)"
        rows="3"
        className="w-full p-4 bg-gray-800 border border-gray-700 text-gray-200 
                   rounded-xl mb-6 focus:ring-2 focus:ring-green-400 
                   focus:border-transparent transition-all resize-y relative z-10"
      />

      {/* Symptoms */}
      <motion.textarea
        variants={itemVariants}
        value={formData.symptoms}
        onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
        placeholder="Not feeling well? Describe your symptoms..."
        rows="3"
        className="w-full p-4 bg-gray-800 border border-gray-700 text-gray-200 
                   rounded-xl mb-6 focus:ring-2 focus:ring-green-400 
                   focus:border-transparent transition-all resize-y relative z-10"
      />

      {/* Report Upload */}
      <motion.div variants={itemVariants} className="mb-6 relative z-10">
        <label className="block mb-2 font-semibold text-gray-300">Upload Health Report (Optional)</label>
        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={(e) => handleFileChange(e.target.files[0])}
          className="w-full text-gray-400 file:mr-4 file:py-2 file:px-4 
                     file:rounded-full file:border-0 file:text-sm 
                     file:font-semibold file:bg-green-50/10 file:text-green-400 
                     hover:file:bg-green-100/20"
        />
      </motion.div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={generatePlan}
        disabled={loading}
        className="w-full bg-gradient-to-r from-green-500 to-blue-500 
                   text-white font-bold py-4 rounded-xl shadow-lg 
                   transition-all duration-300 ease-in-out 
                   disabled:opacity-50 disabled:cursor-not-allowed text-lg 
                   flex items-center justify-center relative z-10"
      >
        {loading ? (
          <span className="flex items-center">
            <AiOutlineLoading3Quarters className="animate-spin mr-3 text-2xl" />
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
