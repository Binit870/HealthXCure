import React from "react";
import { Link } from "react-router-dom";
import { FaMicroscope, FaUsers, FaMapMarkerAlt, FaAppleAlt } from "react-icons/fa";

const ServicesSection = () => (
  <section
    id="services"
    className="py-12 rounded-3xl shadow-2xl fade-in-on-scroll p-8 mb-16 
               relative overflow-hidden max-w-screen-2xl mx-auto"
  >
    {/* Inline CSS for animation */}
    <style>
      {`
        /* Animated gradient background */
        .animated-bg {
          background: linear-gradient(270deg, #a7f3d0, #93c5fd, #99f6e4, #bfdbfe);
          background-size: 800% 800%;
          animation: gradientFlow 15s ease infinite;
          opacity: 0.5;
          filter: blur(60px);
          z-index: 0;
          position: absolute;
          inset: 0;
        }

        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Fade-in animation for section */
        .fade-in-on-scroll {
          animation: fadeInUp 1.2s ease-in-out;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}
    </style>

    {/* Animated Background */}
    <div className="absolute inset-0 animated-bg"></div>

    {/* Main Content */}
    <div className="relative z-10">
      <h3 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
        Our Core <span className="text-sky-600 text-shadow-md">Services</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Symptom Checker */}
        <Link
          to="/symptom-checker"
          className="card rounded-3xl p-8 shadow-md flex flex-col items-center text-center 
                     bg-gray-50 border border-cyan-400 text-gray-900 
                     transition transform hover:scale-105 hover:shadow-xl"
        >
          <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mb-4 text-3xl text-cyan-600">
            <FaMicroscope />
          </div>
          <h4 className="text-2xl font-semibold mb-2">Symptom Checker</h4>
          <p className="text-gray-600">Identify potential diseases based on your symptoms.</p>
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
                     bg-gray-50 border border-emerald-400 text-gray-900 
                     transition transform hover:scale-105 hover:shadow-xl"
        >
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-3xl text-emerald-600">
            <FaUsers />
          </div>
          <h4 className="text-2xl font-semibold mb-2">Community Inn</h4>
          <p className="text-gray-600">Connect with others and share health experiences.</p>
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
                     bg-gray-50 border border-indigo-400 text-gray-900 
                     transition transform hover:scale-105 hover:shadow-xl"
        >
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 text-3xl text-indigo-600">
            <FaMapMarkerAlt />
          </div>
          <h4 className="text-2xl font-semibold mb-2">Find Doctors</h4>
          <p className="text-gray-600">See nearby doctors and clinics on a map.</p>
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
                     bg-gray-50 border border-lime-400 text-gray-900 
                     transition transform hover:scale-105 hover:shadow-xl"
        >
          <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mb-4 text-3xl text-lime-600">
            <FaAppleAlt />
          </div>
          <h4 className="text-2xl font-semibold mb-2">Diet Planner</h4>
          <p className="text-gray-600">Get personalized diet and nutrition plans.</p>
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
    </div>
  </section>
);

export default ServicesSection;
