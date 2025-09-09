import React from 'react';
import { FaHeartbeat, FaRunning, FaBed } from 'react-icons/fa';

const HealthMetricsGrid = ({ heartRate, steps, sleepScore }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
      <div className="rounded-3xl p-8 shadow-xl flex flex-col items-center text-center bg-gradient-to-br from-red-600 to-pink-700 transform transition-all duration-300 hover:shadow-2xl hover:scale-105">
        <FaHeartbeat className="text-white text-5xl mb-4 animate-pulse" />
        <h4 className="text-2xl font-bold mb-2 text-white">Heart Rate</h4>
        <p className="text-white text-3xl font-extrabold">{heartRate} bpm</p>
      </div>
      <div className="rounded-3xl p-8 shadow-xl flex flex-col items-center text-center bg-gradient-to-br from-green-500 to-teal-600 transform transition-all duration-300 hover:shadow-2xl hover:scale-105">
        <FaRunning className="text-white text-5xl mb-4" />
        <h4 className="text-2xl font-bold mb-2 text-white">Steps Today</h4>
        <p className="text-white text-3xl font-extrabold">{steps}</p>
      </div>
      <div className="rounded-3xl p-8 shadow-xl flex flex-col items-center text-center bg-gradient-to-br from-blue-500 to-indigo-600 transform transition-all duration-300 hover:shadow-2xl hover:scale-105">
        <FaBed className="text-white text-5xl mb-4" />
        <h4 className="text-2xl font-bold mb-2 text-white">Sleep Score</h4>
        <p className="text-white text-3xl font-extrabold">{sleepScore}%</p>
      </div>
    </div>
  );
};

export default HealthMetricsGrid;