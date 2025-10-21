// SymptomSelector.jsx (Cleaned up and focused ONLY on common symptoms via checkboxes)

// Filtered list: Contains only common, general symptoms for quick selection.
const symptomOptions = [
  "Fever",
  "Cough",
  "Headache",
  "Fatigue",
  "Sore Throat",
  "Stomach Pain",
  "Body Ache",
  "Nausea",
  "Diarrhea",
  "Vomiting",
  "Runny Nose",
  "Sneezing",
  "Shortness of Breath",
  "Chest Pain",
  "Back Pain",
  "Muscle Pain",
  "Joint Pain",
  "Dizziness",
  "Loss of Appetite",
  "Chills",
  "Sweating",
  "Rash",
  "Itching",
  "Abdominal Cramp",
  "Bloating",
  "Constipation",
  "Heartburn",
  // Added common symptoms
  "Dry Mouth",
  "Thirst",
  "Weakness",
  "Sleepiness",
  "Tingling",
  "Numbness",
  "Light-headedness",
  "Blurred Vision",
  "Sensitivity to Light",
  "Difficulty Sleeping",
  "Loss of Smell",
  "Loss of Taste",
];


const SymptomSelector = ({
    // Renamed props to reflect "symptoms" for clarity and consistency.
    checkedSymptoms, 
    setCheckedSymptoms, 
    // The following props are no longer needed but are kept as a reminder of removal:
    // selectedDisease,
    // setSelectedDisease,
    // onAddSymptoms,
}) => {
    
    // The handler is updated to use the 'symptom' parameter name and the renamed state props.
    const handleCheckboxChange = (symptom) => {
        setCheckedSymptoms((prev) =>
            prev.includes(symptom)
                ? prev.filter((item) => item !== symptom)
                : [...prev, symptom]
        );
    };

    return (
        <div className="border border-white/50 rounded-2xl p-4 mb-4 bg-white/80 text-gray-800 shadow-lg">
            <h3 className="text-sm sm:text-base font-semibold mb-2">
                Quick-Select Common Symptoms 👇
            </h3>

            {/* The entire dropdown and button section is removed. */}
            
            {/* Checkbox List */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                {symptomOptions.map((symptom, index) => (
                    <label
                        key={index}
                        className="flex items-center gap-2 text-sm sm:text-base cursor-pointer hover:text-green-700 transition"
                    >
                        <input
                            type="checkbox"
                            // Updated to use checkedSymptoms state
                            checked={checkedSymptoms.includes(symptom)}
                            // Updated to use symptom in handler
                            onChange={() => handleCheckboxChange(symptom)}
                            className="accent-green-500 w-4 h-4"
                        />
                        {symptom}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default SymptomSelector;