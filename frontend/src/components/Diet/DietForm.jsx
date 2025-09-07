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
      className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-4xl border border-green-200"
    >
      {/* Age & Gender */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <motion.input
          variants={itemVariants}
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
        />
        <motion.select
          variants={itemVariants}
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
        >
          <option>Male</option><option>Female</option><option>Other</option>
        </motion.select>
      </div>

      {/* Goal & Diet Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <motion.select
          variants={itemVariants}
          value={formData.goal}
          onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
          className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
        >
          <option>Weight Loss</option><option>Muscle Gain</option><option>Balanced Nutrition</option>
        </motion.select>
        <motion.select
          variants={itemVariants}
          value={formData.dietType}
          onChange={(e) => setFormData({ ...formData, dietType: e.target.value })}
          className="p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
        >
          <option>Vegetarian</option><option>Vegan</option><option>Keto</option><option>Paleo</option><option>Non-Vegetarian</option>
        </motion.select>
      </div>

      {/* Reason */}
      <motion.div variants={itemVariants} className="mb-6">
        <label className="block mb-2 font-semibold text-gray-700">Reason for Diet</label>
        <select
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
        >
          <option>General Health</option><option>Diabetes</option><option>PCOS</option><option>Heart Health</option><option>Other</option>
        </select>
      </motion.div>

      {/* Days */}
      <motion.div variants={itemVariants} className="mb-6">
        <label className="block mb-2 font-semibold text-gray-700">Number of Days</label>
        <input
          type="number"
          value={formData.days}
          onChange={(e) => setFormData({ ...formData, days: e.target.value })}
          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
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
        className="w-full p-4 border border-gray-300 rounded-xl mb-6 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all resize-y"
      />

      {/* ⭐️ New Diseases Field */}
      <motion.textarea
        variants={itemVariants}
        value={formData.diseases}
        onChange={(e) => setFormData({ ...formData, diseases: e.target.value })}
        placeholder="Do you have any pre-existing medical conditions or diseases? (e.g., Hypertension, Kidney Stones, Celiac Disease...)"
        rows="3"
        className="w-full p-4 border border-gray-300 rounded-xl mb-6 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all resize-y"
      />

      {/* Symptoms */}
      <motion.textarea
        variants={itemVariants}
        value={formData.symptoms}
        onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
        placeholder="Not feeling well? Describe your current symptoms..."
        rows="3"
        className="w-full p-4 border border-gray-300 rounded-xl mb-6 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all resize-y"
      />

      {/* Report Upload */}
      <motion.div variants={itemVariants} className="mb-6">
        <label className="block mb-2 font-semibold text-gray-700">Upload Health Report (Optional)</label>
        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={(e) => handleFileChange(e.target.files[0])}
          className="w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
        />
      </motion.div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={generatePlan}
        disabled={loading}
        className="w-full bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed text-lg flex items-center justify-center"
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