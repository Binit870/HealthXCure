import { motion } from "framer-motion";
import { MdOutlineClose } from "react-icons/md";

const SymptomInput = ({ age, setAge, gender, setGender, symptomsInput, setSymptomsInput, symptomsList, handleAddSymptom, handleRemoveSymptom }) => (
  // Add Framer Motion to the outer div for a fade-in animation
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="w-full max-w-2xl z-10"
  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className="w-full rounded-full p-3 bg-white/10 backdrop-blur-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
      />
      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className="w-full rounded-full p-3 bg-white/10 backdrop-blur-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
      >
        <option value="" disabled>Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </div>

    <div className="w-full border border-white/30 rounded-2xl p-4 mb-4 bg-white/10 backdrop-blur-lg text-white focus-within:ring-2 focus-within:ring-pink-400 shadow-2xl transition-all">
      <div className="flex flex-wrap gap-2 mb-2 min-h-[3rem]">
        {symptomsList.map((symptom, index) => (
          <motion.span 
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white/20 text-white font-semibold py-1 px-3 rounded-full flex items-center gap-2"
          >
            {symptom}
            <button onClick={() => handleRemoveSymptom(index)} className="text-sm"><MdOutlineClose /></button>
          </motion.span>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type symptoms and press Enter (e.g., fever, headache)"
        value={symptomsInput}
        onChange={(e) => setSymptomsInput(e.target.value)}
        onKeyDown={handleAddSymptom}
        className="w-full bg-transparent focus:outline-none placeholder-white/60"
      />
    </div>
  </motion.div>
);

export default SymptomInput;