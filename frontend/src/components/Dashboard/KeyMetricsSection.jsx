import React from 'react';
import { FaHeartbeat, FaRunning, FaMoon, FaAppleAlt } from 'react-icons/fa';

// Component to display a single metric card
const MetricCard = ({ icon: Icon, title, value, unit, color, progress }) => (
  <div className={`p-6 rounded-2xl shadow-md bg-white border-b-4 ${color}-300/80 transition-shadow duration-300 hover:shadow-xl`}>
    <div className="flex items-center justify-between">
      <Icon className={`text-4xl ${color}-500/90`} />
      <span className="text-4xl font-extrabold text-gray-800">{value}</span>
    </div>
    <p className="text-lg font-semibold text-gray-700 mt-2">{title}</p>
    <p className="text-sm text-gray-500">{unit}</p>
    
    {/* Simple Progress Bar Example */}
    {progress !== undefined && (
        <div className="w-full h-2 bg-gray-200 rounded-full mt-3">
            <div 
                className={`h-full rounded-full ${color}-500`} 
                style={{ width: `${progress}%` }} 
            ></div>
        </div>
    )}
  </div>
);

const KeyMetricsSection = ({ user }) => {
  // Mock Data (Replace with real state/API calls in a full implementation)
  const metrics = [
    { 
      id: 1, 
      title: "Avg Heart Rate", 
      value: 72, 
      unit: "BPM (Resting)", 
      icon: FaHeartbeat, 
      color: "text-red",
      progress: 60, // Mock progress for a bar
    },
    { 
      id: 2, 
      title: "Steps Today", 
      value: 8500, 
      unit: "Goal: 10,000", 
      icon: FaRunning, 
      color: "text-blue",
      progress: 85, // 85% progress
    },
    { 
      id: 3, 
      title: "Last Night Sleep", 
      value: "7h 30m", 
      unit: "Quality: Good", 
      icon: FaMoon, 
      color: "text-indigo",
      progress: 75,
    },
    { 
      id: 4, 
      title: "Weekly Diet Score", 
      value: "A-", 
      unit: "Last 7 days", 
      icon: FaAppleAlt, 
      color: "text-teal",
      progress: 90,
    },
  ];

  return (
    <div className="w-full text-left">
      <h3 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-teal-200 pb-2">
        <span className="text-teal-600">Health</span> Snapshot 📸
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.id} {...metric} />
        ))}
      </div>
    </div>
  );
};

export default KeyMetricsSection;