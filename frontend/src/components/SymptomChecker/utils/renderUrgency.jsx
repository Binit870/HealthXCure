const renderUrgency = (level) => {
  const urgencyMap = {
    "Non-Urgent": { color: "bg-green-500", text: "Non-Urgent" },
    "Urgent Care": { color: "bg-yellow-500", text: "Urgent Care" },
    "Emergency": { color: "bg-red-500", text: "Emergency" },
  };
  const { color, text } = urgencyMap[level] || { color: "bg-gray-500", text: "Unknown" };
  return <span className={`px-3 py-1 text-xs font-semibold rounded-full ${color} text-white`}>{text}</span>;
};

export default renderUrgency;
