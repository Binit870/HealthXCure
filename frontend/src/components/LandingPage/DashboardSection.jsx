import React from "react";
import { Link } from "react-router-dom";
import {
  FaBell,
  FaUserCircle,
  FaHistory,
  FaTachometerAlt
} from "react-icons/fa";

const DashboardSection = () => (
  <section
    id="dashboard"
    className="scroll-mt-20 py-10 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-gradient-to-br from-cyan-500 via-cyan-600 to-cyan-800 
               overflow-hidden border border-cyan-400 rounded-3xl shadow-2xl fade-in-on-scroll text-center text-white mb-16 max-w-screen-2xl mx-auto"
  >
    <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 flex items-center justify-center gap-4">
      <FaTachometerAlt className="text-white text-3xl sm:text-4xl" />
      Your Personal Health Dashboard
    </h3>

    <p className="text-white max-w-2xl mx-auto mb-10 text-base sm:text-lg md:text-xl">
      Stay updated with <FaBell className="inline text-yellow-300" /> notifications, manage your{" "}
      <FaUserCircle className="inline text-sky-300" /> profile, and review your{" "}
      <FaHistory className="inline text-purple-300" /> health history.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
      {/* Notifications */}
      <div className="rounded-3xl p-6 sm:p-8 shadow-md flex flex-col items-center text-center 
                      bg-slate-950/70 border border-yellow-500 text-white 
                      transition transform hover:scale-105 hover:shadow-xl">
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mb-4 text-2xl sm:text-3xl text-yellow-400">
          <FaBell />
        </div>
        <h4 className="text-xl sm:text-2xl font-semibold mb-2">Notifications</h4>
        <p className="text-gray-400 text-sm sm:text-base">
          You have 3 new alerts including appointment reminders and diet tips.
        </p>
      </div>

      {/* User Profile */}
      <div className="rounded-3xl p-6 sm:p-8 shadow-md flex flex-col items-center text-center 
                      bg-slate-950/70 border border-sky-500 text-white 
                      transition transform hover:scale-105 hover:shadow-xl">
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-sky-500/20 rounded-full flex items-center justify-center mb-4 text-2xl sm:text-3xl text-sky-400">
          <FaUserCircle />
        </div>
        <h4 className="text-xl sm:text-2xl font-semibold mb-2">Welcome, Priya</h4>
        <p className="text-gray-400 text-sm sm:text-base">
          View and update your personal details, preferences, and health goals.
        </p>
      </div>

      {/* History */}
      <div className="rounded-3xl p-6 sm:p-8 shadow-md flex flex-col items-center text-center 
                      bg-slate-950/70 border border-purple-500 text-white 
                      transition transform hover:scale-105 hover:shadow-xl">
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-4 text-2xl sm:text-3xl text-purple-400">
          <FaHistory />
        </div>
        <h4 className="text-xl sm:text-2xl font-semibold mb-2">Health History</h4>
        <p className="text-gray-400 text-sm sm:text-base">
          Review your past symptoms, diet plans, and activity logs.
        </p>
      </div>
    </div>

    {/* Main Dashboard Button */}
    <div className="mt-10 sm:mt-12 text-center">
      <Link
        to="/dashboard"
        className="inline-block px-6 py-3 text-base sm:text-lg font-semibold text-white 
                   bg-gradient-to-r from-teal-600 to-blue-700 rounded-full shadow-md 
                   hover:scale-105 hover:shadow-xl transition"
      >
        Go to Dashboard
      </Link>
    </div>
  </section>
);

export default DashboardSection;
