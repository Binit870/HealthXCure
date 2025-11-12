import React from "react";
import { Link } from "react-router-dom";
import { FaRobot, FaChartLine, FaAppleAlt, FaArrowRight } from "react-icons/fa";

const TransformHealth = () => (
  <section
    id="transform-health"
    className="py-16 rounded-3xl shadow-2xl p-8 mb-16 
               relative overflow-hidden max-w-screen-2xl mx-auto bg-teal-50"
  >
    <div className="relative z-10">
      {/* Heading */}
      <h3 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
        Ready to <span className="text-teal-700 text-shadow-md">Transform Your Health</span>?
      </h3>

      <p className="text-lg text-gray-800 max-w-2xl mx-auto mb-12 text-center">
        Join thousands of users who trust{" "}
        <span className="font-semibold text-teal-700">HealthXCure</span> for their wellness journey — 
        empowering you to take control of your health.
      </p>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* AI Health Chat */}
        <div className="rounded-3xl p-8 shadow-md bg-cyan-50 border-2 border-cyan-400 
                        transition transform hover:scale-105 hover:shadow-xl text-gray-900">
          <div className="flex items-center justify-center gap-3 mb-4 text-cyan-600">
            <FaRobot className="text-3xl" />
            <h4 className="text-2xl font-bold">AI Health Chat</h4>
          </div>
          <p className="text-gray-700 text-center">
            Get instant answers and recommendations from your AI-powered assistant.
          </p>
        </div>

        {/* Health Dashboard */}
        <div className="rounded-3xl p-8 shadow-md bg-emerald-50 border-2 border-emerald-400 
                        transition transform hover:scale-105 hover:shadow-xl text-gray-900">
          <div className="flex items-center justify-center gap-3 mb-4 text-emerald-600">
            <FaChartLine className="text-3xl" />
            <h4 className="text-2xl font-bold">Health Dashboard</h4>
          </div>
          <p className="text-gray-700 text-center">
            Track your vitals, reports, and health progress — all in one place.
          </p>
        </div>

        {/* Smart Wellness Plans */}
        <div className="rounded-3xl p-8 shadow-md bg-sky-50 border-2 border-sky-400 
                        transition transform hover:scale-105 hover:shadow-xl text-gray-900">
          <div className="flex items-center justify-center gap-3 mb-4 text-sky-600">
            <FaAppleAlt className="text-3xl" />
            <h4 className="text-2xl font-bold">Smart Wellness Plans</h4>
          </div>
          <p className="text-gray-700 text-center">
            AI-tailored diet and fitness plans personalized just for you.
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-12 text-center">
        <Link
          to="/symptom-checker"
          className="inline-flex items-center gap-2 px-6 py-3 text-lg font-semibold text-white 
                     bg-teal-700 rounded-full shadow-md 
                     hover:scale-105 hover:shadow-xl transition"
        >
          Start Your Journey <FaArrowRight className="text-white text-lg" />
        </Link>
      </div>
    </div>
  </section>
);

export default TransformHealth;
