// utils/renderUrgency.js

const renderUrgency = (level) => {
  if (!level) level = "Non-Urgent";

  // Normalize the input for consistent matching
  const normalized = level.trim(); 
  
  let key = "Non-Urgent";
  
  // 🎯 FIX: Use direct equality check instead of includes()
  if (normalized === "Emergency") {
    key = "Emergency";
  } else if (normalized === "Urgent Care") {
    key = "Urgent Care";
  } else {
    // Falls back to "Non-Urgent" for all other values
    key = "Non-Urgent";
  }

  const urgencyMap = {
    "Non-Urgent": { color: "bg-green-500", text: "Non-Urgent" },
    "Urgent Care": { color: "bg-yellow-500", text: "Urgent Care" },
    "Emergency": { color: "bg-red-500", text: "Emergency" },
  };

  const { color, text } = urgencyMap[key];
  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${color} text-white`}>
      {text}
    </span>
  );
};

export default renderUrgency;