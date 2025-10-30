import React from 'react';
import {
  FaTimes,
  FaGlobe,
  FaMapMarkerAlt,
  FaStethoscope,
} from "react-icons/fa";

const FilterPanel = ({ 
    states, 
    cities, 
    specializations, 
    tempState, 
    setTempState, 
    tempCity, 
    setTempCity, 
    tempSpecialization, 
    setTempSpecialization, 
    onApply, 
    onClose, 
    onResetTemp 
}) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex justify-center items-start pt-10">
      <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-lg relative">
        <h3 className="text-xl font-bold text-teal-600 mb-4">Advanced Filters</h3>
        <button 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <FaTimes size={20} />
        </button>

        <div className="space-y-4">
          {/* State Filter */}
          <div className="relative">
            <FaGlobe className="absolute left-3 top-3.5 text-gray-400 z-10" />
            <select
              value={tempState}
              onChange={(e) => setTempState(e.target.value)}
              className="p-3 pl-10 border rounded-lg w-full bg-white appearance-none"
            >
              <option value="">Select State</option>
              {states.map((s, i) => (
                <option key={i} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* City Filter */}
          <div className="relative">
            <FaMapMarkerAlt className="absolute left-3 top-3.5 text-gray-400 z-10" />
            <select
              value={tempCity}
              onChange={(e) => setTempCity(e.target.value)}
              className="p-3 pl-10 border rounded-lg w-full bg-white appearance-none"
            >
              <option value="">Select City</option>
              {cities.map((c, i) => (
                <option key={i} value={c}>{c}</option>
              ))}
            </select>
          </div>
          
          {/* Specialization Filter */}
          <div className="relative">
            <FaStethoscope className="absolute left-3 top-3.5 text-gray-400 z-10" />
            <select
              value={tempSpecialization}
              onChange={(e) => setTempSpecialization(e.target.value)}
              className="p-3 pl-10 border rounded-lg w-full bg-white appearance-none"
            >
              <option value="">Select Specialization</option>
              {specializations.map((s, i) => (
                <option key={i} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-between gap-4">
          <button
            onClick={onResetTemp}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium flex-1"
          >
            Clear Selections
          </button>
          <button
            onClick={onApply}
            className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg font-medium flex-1"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;