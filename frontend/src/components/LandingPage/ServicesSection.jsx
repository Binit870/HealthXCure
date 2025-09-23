import React from "react";
import { Link } from "react-router-dom";
import { FaMicroscope, FaUsers, FaMapMarkerAlt, FaAppleAlt } from "react-icons/fa";

const ServicesSection = () => (
  <section
    id="services"
    className="py-12 rounded-3xl shadow-2xl fade-in-on-scroll p-8 mb-16 
               bg-gradient-to-br from-cyan-800 via-cyan-800 to-cyan-700 border-white/10"
  >
    <h3 className="text-4xl font-extrabold text-white text-center mb-12">
      Our Core Services
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Symptom Checker */}
      <Link
        to="/symptom-checker"
        className="card rounded-3xl p-8 shadow-md flex flex-col items-center text-center 
                   bg-slate-900/80 border border-cyan-500 text-white 
                   transition transform hover:scale-105 hover:shadow-xl"
      >
        <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mb-4 text-3xl text-cyan-400">
          <FaMicroscope />
        </div>
        <h4 className="text-2xl font-semibold mb-2">Symptom Checker</h4>
        <p className="text-gray-300">Identify potential diseases based on your symptoms.</p>
        
        {/* View Button */}
        <div className="mt-4">
          <span className="inline-block px-4 py-2 text-sm font-medium text-white 
                         bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-full shadow 
                         hover:scale-105 hover:shadow-lg transition">
            View
          </span>
        </div>
      </Link>

      {/* Community */}
      <Link
        to="/community"
        className="card rounded-3xl p-8 shadow-md flex flex-col items-center text-center 
                   bg-slate-900/80 border border-emerald-500 text-white 
                   transition transform hover:scale-105 hover:shadow-xl"
      >
        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 text-3xl text-emerald-400">
          <FaUsers />
        </div>
        <h4 className="text-2xl font-semibold mb-2">Community Inn</h4>
        <p className="text-gray-300">Connect with others and share health experiences.</p>
        
        {/* View Button */}
        <div className="mt-4">
          <span className="inline-block px-4 py-2 text-sm font-medium text-white 
                         bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-full shadow 
                         hover:scale-105 hover:shadow-lg transition">
            View
          </span>
        </div>
      </Link>

      {/* Find Doctors */}
      <Link
        to="/find-doctors"
        className="card rounded-3xl p-8 shadow-md flex flex-col items-center text-center 
                   bg-slate-900/80 border border-indigo-500 text-white 
                   transition transform hover:scale-105 hover:shadow-xl"
      >
        <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mb-4 text-3xl text-indigo-400">
          <FaMapMarkerAlt />
        </div>
        <h4 className="text-2xl font-semibold mb-2">Find Doctors</h4>
        <p className="text-gray-300">See nearby doctors and clinics on a map.</p>
       
        {/* View Button */}
        <div className="mt-4">
          <span className="inline-block px-4 py-2 text-sm font-medium text-white 
                         bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-full shadow 
                         hover:scale-105 hover:shadow-lg transition">
            View
          </span>
        </div>
      </Link>

      {/* Diet Planner */}
      <Link
        to="/diet-planner"
        className="card rounded-3xl p-8 shadow-md flex flex-col items-center text-center 
                   bg-slate-900/80 border border-lime-500 text-white 
                   transition transform hover:scale-105 hover:shadow-xl"
      >
        <div className="w-16 h-16 bg-lime-500/20 rounded-full flex items-center justify-center mb-4 text-3xl text-lime-400">
          <FaAppleAlt />
        </div>
        <h4 className="text-2xl font-semibold mb-2">Diet Planner</h4>
        <p className="text-gray-300">Get personalized diet and nutrition plans.</p>
        
        {/* View Button */}
        <div className="mt-4">
          <span className="inline-block px-4 py-2 text-sm font-medium text-white 
                         bg-gradient-to-r from-lime-600 to-lime-700 rounded-full shadow 
                         hover:scale-105 hover:shadow-lg transition">
            View
          </span>
        </div>
      </Link>
    </div>

    {/* Button */}
    <div className="mt-12 text-center">
      <Link
        to="/services"
        className="inline-block px-6 py-3 text-lg font-semibold text-white 
                   bg-gradient-to-r from-cyan-600 to-emerald-700 rounded-full shadow-md 
                   hover:scale-105 hover:shadow-xl transition"
      >
        See More Services
      </Link>
    </div>
  </section>
);

export default ServicesSection;
