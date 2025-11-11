import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineClose } from "react-icons/md";
import { useState, useEffect } from "react";
import SymptomSelector from "./SymptomSelector";
import PainAreaSelector from "./PainAreaSelector";

const SymptomInput = ({
  age,
  setAge,
  gender,
  setGender,
  symptomsList,
  setSymptomsList,
}) => {
  const [symptomsInput, setSymptomsInput] = useState("");
  const [checkedSymptoms, setCheckedSymptoms] = useState([]);
  const [typedSymptoms, setTypedSymptoms] = useState([]);
  const [hasPain, setHasPain] = useState("");
  const [checkedPainAreas, setCheckedPainAreas] = useState([]);
  const [painDescriptions, setPainDescriptions] = useState({});
  const [medication, setMedication] = useState(""); // 💊
  const [otherInfo, setOtherInfo] = useState(""); // 🧾

  // 🧩 Combine both typed + checkbox symptoms
  useEffect(() => {
    const combined = [...checkedSymptoms, ...typedSymptoms];
    setSymptomsList(combined);
  }, [checkedSymptoms, typedSymptoms, setSymptomsList]);

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && symptomsInput.trim()) {
      e.preventDefault();
      const newSymptom = symptomsInput.trim();

      if (
        !typedSymptoms.includes(newSymptom) &&
        !checkedSymptoms.includes(newSymptom)
      ) {
        setTypedSymptoms((prev) => [...prev, newSymptom]);
      }
      setSymptomsInput("");
    }
  };

  const handleRemoveSymptom = (symptom) => {
    setCheckedSymptoms((prev) => prev.filter((s) => s !== symptom));
    setTypedSymptoms((prev) => prev.filter((s) => s !== symptom));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-2xl z-10 p-3 sm:p-0"
    >
      {/* 👤 Age & Gender Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full rounded-full p-3 bg-white/90 text-gray-800 placeholder-gray-500 
          focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md text-sm sm:text-base"
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full rounded-full p-3 bg-white/90 text-gray-800 
          focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md text-sm sm:text-base"
        >
          <option value="" disabled>
            Select Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* 🩺 Disease/Symptom Selector */}
      <SymptomSelector
        checkedSymptoms={checkedSymptoms}
        setCheckedSymptoms={setCheckedSymptoms}
      />

      {/* 💬 Combined Display Box */}
      <div className="w-full border border-white/50 rounded-2xl p-4 mb-4 bg-white/80 text-gray-800 shadow-lg">
        <p className="text-gray-600 text-sm font-medium mb-2">
          Selected & Typed Symptoms 👇
        </p>

        <AnimatePresence>
          <div className="flex flex-wrap gap-2 mb-3 min-h-[3rem]">
            {symptomsList.length > 0 ? (
              symptomsList.map((symptom, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`${
                    checkedSymptoms.includes(symptom)
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  } font-semibold py-1 px-3 rounded-full flex items-center gap-2 
                  text-xs sm:text-sm shadow-sm`}
                >
                  {symptom}
                  <button
                    onClick={() => handleRemoveSymptom(symptom)}
                    className="hover:text-red-500"
                  >
                    <MdOutlineClose />
                  </button>
                </motion.span>
              ))
            ) : (
              <span className="text-gray-400 text-sm">
                No symptoms selected yet
              </span>
            )}
          </div>
        </AnimatePresence>

        {/* ✍️ Input Field inside same box */}
        <input
          type="text"
          placeholder="Type a symptom and press Enter (e.g. headache)"
          value={symptomsInput}
          onChange={(e) => setSymptomsInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
          className="w-full bg-transparent border-b border-gray-300 focus:border-green-400 
          focus:outline-none text-gray-800 text-sm sm:text-base pb-1"
        />
      </div>

      {/* 🩹 Pain Area Selector */}
      <PainAreaSelector
        hasPain={hasPain}
        setHasPain={setHasPain}
        checkedPainAreas={checkedPainAreas}
        setCheckedPainAreas={setCheckedPainAreas}
        painDescriptions={painDescriptions}
        setPainDescriptions={setPainDescriptions}
      />

      {/* 💊 Medication Section (AFTER Pain Area) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full border border-white/50 rounded-2xl p-4 mt-4 bg-white/80 text-gray-800 shadow-lg"
      >
        <label className="block text-gray-700 text-sm font-medium mb-1">
          Do you take any medication?
        </label>
        <input
          type="text"
          placeholder="Type medication name or 'No'"
          value={medication}
          onChange={(e) => setMedication(e.target.value)}
          className="w-full bg-white/90 border border-gray-300 rounded-lg p-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </motion.div>

      {/* 🧾 Other Information Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="w-full border border-white/50 rounded-2xl p-4 mt-4 bg-white/80 text-gray-800 shadow-lg"
      >
        <label className="block text-gray-700 text-sm font-medium mb-1">
           Any other specification you want to tell or not listed?
        </label>
        <textarea
          placeholder="Type additional information here..."
          value={otherInfo}
          onChange={(e) => setOtherInfo(e.target.value)}
          rows={3}
          className="w-full bg-white/90 border border-gray-300 rounded-lg p-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
        />
      </motion.div>
    </motion.div>
  );
};

export default SymptomInput;
