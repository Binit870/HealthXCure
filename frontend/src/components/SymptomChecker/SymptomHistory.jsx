import { useEffect, useState } from "react";

const SymptomHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("symptomHistory")) || [];
    setHistory(savedHistory);
  }, []);

  return (
    <div className="mt-10 w-full max-w-3xl bg-white/10 p-6 rounded-2xl text-white backdrop-blur-lg">
      <h2 className="text-2xl font-bold mb-4">📜 Your Symptom History</h2>
      {history.length === 0 ? (
        <p className="text-white/70">No history available yet.</p>
      ) : (
        <ul className="space-y-3">
          {history.map((item, index) => (
            <li key={index} className="bg-white/20 p-3 rounded-lg">
              <strong>Symptoms:</strong> {item.symptoms.join(", ")} <br />
              <strong>Date:</strong> {item.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SymptomHistory;
