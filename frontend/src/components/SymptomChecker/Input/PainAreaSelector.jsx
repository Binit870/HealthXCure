import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineClose } from "react-icons/md";
import { useState, useRef, useEffect } from "react";

const painAreas = [
  "Head",
  "Chest",
  "Stomach",
  "Back",
  "Legs",
  "Arms",
  "Neck",
  "Joints",
];

const PainAreaSelector = ({
  hasPain,
  setHasPain,
  checkedPainAreas,
  setCheckedPainAreas,
  painDescriptions,
  setPainDescriptions,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectPainArea = (area) => {
    if (!checkedPainAreas.includes(area)) {
      setCheckedPainAreas([...checkedPainAreas, area]);
      setPainDescriptions((prev) => ({
        ...prev,
        [area]: { description: "", duration: "" },
      }));
    }
    setIsDropdownOpen(false); // close after selection
  };

  const handlePainDescriptionChange = (area, description) => {
    setPainDescriptions((prev) => ({
      ...prev,
      [area]: { ...prev[area], description },
    }));
  };

  const handlePainDurationChange = (area, duration) => {
    setPainDescriptions((prev) => ({
      ...prev,
      [area]: { ...prev[area], duration },
    }));
  };

  const handleRemovePainArea = (area) => {
    setCheckedPainAreas((prev) => prev.filter((a) => a !== area));
    setPainDescriptions((prev) => {
      const updated = { ...prev };
      delete updated[area];
      return updated;
    });
  };

  return (
    <div className="border border-white/50 rounded-2xl p-4 mb-4 bg-white/80 text-gray-800 shadow-lg">
      <h3 className="text-sm sm:text-base font-semibold mb-2">
        Do you have pain anywhere?
      </h3>

      {/* Yes/No Dropdown */}
      <select
        value={hasPain}
        onChange={(e) => {
          setHasPain(e.target.value);
          if (e.target.value === "No") {
            setCheckedPainAreas([]);
            setPainDescriptions({});
          }
        }}
        className="w-full mb-3 rounded-full p-2 bg-white text-gray-800 border border-gray-300 focus:ring-2 focus:ring-green-400 text-sm sm:text-base"
      >
        <option value="">Select...</option>
        <option value="No">No</option>
        <option value="Yes">Yes</option>
      </select>

      {hasPain === "Yes" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-xs text-gray-600 mb-2">Select pain areas 👇</p>

          <div ref={dropdownRef} className="relative mb-3">
            {/* Dropdown Button */}
            <button
              className="w-full p-2 bg-white border border-gray-300 rounded-lg flex justify-between items-center text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-400"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {checkedPainAreas.length
                ? `Selected: ${checkedPainAreas.join(", ")}`
                : "Select pain area(s)"}
              <span className="ml-2">▼</span>
            </button>

            {/* Dropdown List */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto"
                >
                  {painAreas.map((area, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelectPainArea(area)}
                      className={`px-3 py-2 text-sm cursor-pointer hover:bg-green-100 ${
                        checkedPainAreas.includes(area)
                          ? "bg-green-50 font-semibold text-green-700"
                          : "text-gray-700"
                      }`}
                    >
                      {area}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Pain Details */}
          {checkedPainAreas.map((area, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-3 border border-gray-200 rounded-lg p-3 bg-gray-50"
            >
              <label className="block text-xs sm:text-sm text-gray-700 mb-1 font-medium">
                Describe the pain in your {area.toLowerCase()}:
              </label>
              <input
                type="text"
                value={painDescriptions[area]?.description || ""}
                onChange={(e) =>
                  handlePainDescriptionChange(area, e.target.value)
                }
                placeholder="e.g., sharp, dull, throbbing..."
                className="w-full rounded-lg p-2 border border-gray-300 focus:ring-2 focus:ring-green-400 text-gray-800 text-sm sm:text-base mb-2"
              />

              <label className="block text-xs sm:text-sm text-gray-700 mb-1 font-medium">
                Duration of pain:
              </label>
              <input
                type="text"
                value={painDescriptions[area]?.duration || ""}
                onChange={(e) =>
                  handlePainDurationChange(area, e.target.value)
                }
                placeholder="e.g., 2 days, 1 week..."
                className="w-full rounded-lg p-2 border border-gray-300 focus:ring-2 focus:ring-green-400 text-gray-800 text-sm sm:text-base"
              />

              <button
                onClick={() => handleRemovePainArea(area)}
                className="mt-2 text-red-500 text-xs sm:text-sm hover:underline"
              >
                Remove
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default PainAreaSelector;
