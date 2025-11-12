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
      className="bg-white backdrop-blur-xl px-4 sm:px-6 md:px-8 py-6 sm:py-8 rounded-3xl shadow-2xl w-full max-w-4xl border border-gray-400 relative overflow-hidden"
    >
     

      {/* Age, Gender, Height, Weight */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 relative z-10">
        <motion.input
          variants={itemVariants}
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          className="p-4 bg-white border border-teal-700 text-black rounded-xl  transition-all text-sm sm:text-base w-full"
        />

        <motion.select
          variants={itemVariants}
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          className="p-4 bg-white border border-teal-700 text-black rounded-xl  transition-all text-sm sm:text-base w-full"
        >
          <option className="bg-white text-black">Male</option>
          <option className="bg-white text-black">Female</option>
          <option className="bg-white text-black">Other</option>
        </motion.select>

        <motion.input
          variants={itemVariants}
          type="number"
          placeholder="Height (cm)"
          value={formData.height}
          onChange={(e) => setFormData({ ...formData, height: e.target.value })}
          className="p-4 bg-white border border-teal-700 text-black rounded-xl transition-all text-sm sm:text-base w-full"
        />

        <motion.input
          variants={itemVariants}
          type="number"
          placeholder="Weight (kg)"
          value={formData.weight}
          onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
          className="p-4 bg-white border border-teal-700 text-black  rounded-xl  transition-all text-sm sm:text-base w-full"
        />
      </div>

      {/* Goal & Diet Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 relative z-10">
        <motion.select
          variants={itemVariants}
          value={formData.goal}
          onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
          className="p-4 bg-white border border-teal-700 text-black  rounded-xl  transition-all text-sm sm:text-base w-full"
        >
          <option className="bg-white text-black">Weight Loss</option>
          <option className="bg-white text-black">Muscle Gain</option>
          <option className="bg-white text-black">Balanced Nutrition</option>
        </motion.select>

        <motion.select
          variants={itemVariants}
          value={formData.dietType}
          onChange={(e) => setFormData({ ...formData, dietType: e.target.value })}
          className="p-4 bg-white border border-teal-700 text-black  rounded-xl transition-all text-sm sm:text-base w-full"
        >
          <option className="bg-white text-black">Vegetarian</option>
          <option className="bg-white text-black">Vegan</option>
          
          <option className="bg-white text-black">Non-Vegetarian</option>
        </motion.select>
      </div>

      {/* Reason */}
      <motion.div variants={itemVariants} className="mb-6 relative z-10 w-full">
        <label className="block mb-2 font-semibold text-white text-sm sm:text-base">Reason for Diet</label>
        <select
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          className="w-full p-4 bg-white border border-teal-700 text-black  rounded-xl transition-all text-sm sm:text-base"
        >
          <option className="bg-white text-black">General Health</option>
          <option className="bg-white text-black">Diabetes</option>
          
          <option className="bg-white text-black">Heart Health</option>
          <option className="bg-white text-black">Other</option>
        </select>
      </motion.div>

      {/* Days */}
      <motion.div variants={itemVariants} className="mb-6 relative z-10 w-full">
        <label className="block mb-2 font-semibold text-white text-sm sm:text-base">Number of Days</label>
        <input
          type="number"
          value={formData.days}
          onChange={(e) => setFormData({ ...formData, days: e.target.value })}
          className="w-full p-4 bg-white border border-teal-700 text-black  rounded-xl transition-all text-sm sm:text-base"
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
        className="w-full p-4 bg-white border border-teal-700 text-black  rounded-xl transition-all resize-y text-sm sm:text-base"
      />

      {/* Diseases */}
      <motion.textarea
        variants={itemVariants}
        value={formData.diseases}
        onChange={(e) => setFormData({ ...formData, diseases: e.target.value })}
        placeholder="Any medical conditions? (e.g., Hypertension, Celiac Disease...)"
        rows="3"
        className="w-full p-4 bg-white border border-teal-700 text-black  rounded-xl transition-all resize-y text-sm sm:text-base"
      />

      {/* Symptoms */}
      <motion.textarea
        variants={itemVariants}
        value={formData.symptoms}
        onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
        placeholder="Not feeling well? Describe your symptoms..."
        rows="3"
        className="w-full p-4 bg-white border border-teal-700 text-black  rounded-xl transition-all resize-y text-sm sm:text-base"
      />

      

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={generatePlan}
        disabled={loading}
        className="w-full bg-teal-800 text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed text-lg flex items-center justify-center"
      >
        {loading ? (
          <span className="flex items-center">
            <AiOutlineLoading3Quarters className="animate-spin mr-3 text-2xl text-white" />
            Generating Your Plan...
          </span>
        ) : (
          "✨ Generate"
        )}
     

</motion.button>
    </motion.div>
  );
};

export default DietForm;