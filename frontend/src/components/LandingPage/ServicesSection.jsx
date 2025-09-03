import React from "react";
import { Link } from "react-router-dom";
import { FaMicroscope, FaCalendarCheck, FaMapMarkerAlt, FaAppleAlt } from "react-icons/fa";

const ServicesSection = () => (
  <section
    id="services"
    className="py-12 rounded-3xl shadow-2xl fade-in-on-scroll p-8 mb-16 bg-white/10 backdrop-blur-xl border border-white/10"
  >
    <h3 className="text-4xl font-extrabold text-white text-center mb-12">
      Our Core Services
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <Link to="/symptom-checker" className="card rounded-3xl p-8 shadow-md flex flex-col items-center text-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white transition transform hover:scale-105 hover:shadow-xl">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 text-white text-3xl">
          <FaMicroscope />
        </div>
        <h4 className="text-2xl font-semibold mb-2">Symptom Checker</h4>
        <p className="text-gray-200">Identify potential diseases based on your symptoms.</p>
      </Link>

      <Link to="/book-appointment" className="card rounded-3xl p-8 shadow-md flex flex-col items-center text-center bg-gradient-to-br from-emerald-600 to-green-700 text-white transition transform hover:scale-105 hover:shadow-xl">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 text-white text-3xl">
          <FaCalendarCheck />
        </div>
        <h4 className="text-2xl font-semibold mb-2">Book Appointment</h4>
        <p className="text-gray-200">Schedule a visit with qualified doctors near you.</p>
      </Link>

      <Link to="/find-doctors" className="card rounded-3xl p-8 shadow-md flex flex-col items-center text-center bg-gradient-to-br from-purple-600 to-indigo-700 text-white transition transform hover:scale-105 hover:shadow-xl">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 text-white text-3xl">
          <FaMapMarkerAlt />
        </div>
        <h4 className="text-2xl font-semibold mb-2">Find Doctors</h4>
        <p className="text-gray-200">See nearby doctors and clinics on a map.</p>
      </Link>

      <Link to="/diet-planner" className="card rounded-3xl p-8 shadow-md flex flex-col items-center text-center bg-gradient-to-br from-amber-500 to-orange-600 text-white transition transform hover:scale-105 hover:shadow-xl">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 text-white text-3xl">
          <FaAppleAlt />
        </div>
        <h4 className="text-2xl font-semibold mb-2">Diet Planner</h4>
        <p className="text-gray-100">Get personalized diet and nutrition plans.</p>
      </Link>
    </div>
  </section>
);

export default ServicesSection;
