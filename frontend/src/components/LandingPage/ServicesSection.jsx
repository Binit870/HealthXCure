import React from "react";
import { Link } from "react-router-dom";
import {
  FaStethoscope,
  FaUserMd,
  FaDumbbell,
  FaFileMedical,
  FaArrowRight,
} from "react-icons/fa";

const ServicesSection = () => (
  <section
    id="services"
    className="py-12 rounded-3xl shadow-2xl p-8 mb-16 
               relative overflow-hidden max-w-screen-2xl mx-auto bg-teal-100"
  >
    <div className="relative z-10">
      <h3 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
        Discover What <span className="text-teal-700 text-shadow-md">We Offer</span>
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
            <FaStethoscope />
          </div>
          <h4 className="text-2xl font-semibold mb-2">Symptica</h4>
          <p className="text-gray-600">Identify potential diseases based on your symptoms.</p>
          <div className="mt-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white 
                           bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-full shadow 
                           hover:scale-105 hover:shadow-lg transition">
              View <FaArrowRight />
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
            <FaUserMd />
          </div>
          <h4 className="text-2xl font-semibold mb-2">Find Doctors</h4>
          <p className="text-gray-600">See nearby doctors and clinics on a map.</p>
          <div className="mt-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white 
                           bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-full shadow 
                           hover:scale-105 hover:shadow-lg transition">
              View <FaArrowRight />
            </span>
          </div>
        </Link>

        {/* Fitness Planner */}
        <Link
          to="/fitness"
          className="card rounded-3xl p-8 shadow-md flex flex-col items-center text-center 
                     bg-gray-50 border border-emerald-400 text-gray-900 
                     transition transform hover:scale-105 hover:shadow-xl"
        >
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-3xl text-emerald-600">
            <FaDumbbell />
          </div>
          <h4 className="text-2xl font-semibold mb-2">Fitness Planner</h4>
          <p className="text-gray-600">Build your ideal workout and track progress easily.</p>
          <div className="mt-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white 
                           bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-full shadow 
                           hover:scale-105 hover:shadow-lg transition">
              View <FaArrowRight />
            </span>
          </div>
        </Link>

        {/* Report Analyzer */}
        <Link
          to="/reports"
          className="card rounded-3xl p-8 shadow-md flex flex-col items-center text-center 
                     bg-gray-50 border border-lime-400 text-gray-900 
                     transition transform hover:scale-105 hover:shadow-xl"
        >
          <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mb-4 text-3xl text-lime-600">
            <FaFileMedical />
          </div>
          <h4 className="text-2xl font-semibold mb-2">Report Analyzer</h4>
          <p className="text-gray-600">Get personalized insights from your medical reports.</p>
          <div className="mt-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white 
                           bg-gradient-to-r from-lime-600 to-lime-700 rounded-full shadow 
                           hover:scale-105 hover:shadow-lg transition">
              View <FaArrowRight />
            </span>
          </div>
        </Link>
      </div>
    </div>
  </section>
);

export default ServicesSection;
