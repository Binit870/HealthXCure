import React from "react";
import { Link } from "react-router-dom";
import {
  FaBell,
  FaUserCircle,
  FaHistory,
  FaTachometerAlt
} from "react-icons/fa";

const AssistantSection = () => (
  <section
    id="dashboard"
    className="py-12 bg-gradient-to-br from-cyan-500 via-cyan-600 to-cyan-800 overflow-hidden border border-cyan-400
     
                rounded-3xl shadow-2xl fade-in-on-scroll p-8 md:p-12 text-center text-white mb-16"
  >
    <h3 className="text-4xl font-extrabold text-white mb-6 flex items-center justify-center gap-4">
      <FaTachometerAlt className="text-white text-4xl" />
      Your Personal Health Dashboard
    </h3>
    <p className="text-gray-300 max-w-2xl mx-auto mb-10">
      Stay updated with <FaBell className="inline text-yellow-300" /> notifications, manage your{" "}
      <FaUserCircle className="inline text-sky-300" /> profile, and review your{" "}
      <FaHistory className="inline text-purple-300" /> health history.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Notifications */}
      <div
        className="card rounded-3xl p-8 shadow-md flex flex-col items-center text-center 
                    bg-slate-950/70 border border-yellow-500 text-white 
                    transition transform hover:scale-105 hover:shadow-xl"
      >
        <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mb-4 text-3xl text-yellow-400">
          <FaBell />
        </div>
        <h4 className="text-2xl font-semibold mb-2">Notifications</h4>
        <p className="text-gray-400">
          You have 3 new alerts including appointment reminders and diet tips.
        </p>
      </div>

      {/* User Profile */}
      <div
        className="card rounded-3xl p-8 shadow-md flex flex-col items-center text-center 
                    bg-slate-950/70 border border-sky-500 text-white 
                    transition transform hover:scale-105 hover:shadow-xl"
      >
        <div className="w-16 h-16 bg-sky-500/20 rounded-full flex items-center justify-center mb-4 text-3xl text-sky-400">
          <FaUserCircle />
        </div>
        <h4 className="text-2xl font-semibold mb-2">Welcome, Priya</h4>
        <p className="text-gray-400">
          View and update your personal details, preferences, and health goals.
        </p>
      </div>

      {/* History */}
      <div
        className="card rounded-3xl p-8 shadow-md flex flex-col items-center text-center 
                    bg-slate-950/70 border border-purple-500 text-white 
                    transition transform hover:scale-105 hover:shadow-xl"
      >
        <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-4 text-3xl text-purple-400">
          <FaHistory />
        </div>
        <h4 className="text-2xl font-semibold mb-2">Health History</h4>
        <p className="text-gray-400">
          Review your past symptoms, diet plans, and activity logs.
        </p>
      </div>
    </div>

    {/* Main Dashboard Button */}
    <div className="mt-12 text-center">
      <Link
        to="/dashboard"
        className="inline-block px-6 py-3 text-lg font-semibold text-white 
                    bg-gradient-to-r from-teal-600 to-blue-700 rounded-full shadow-md 
                    hover:scale-105 hover:shadow-xl transition"
      >
        Go to Dashboard
      </Link>
    </div>
  </section>
);

export default AssistantSection;