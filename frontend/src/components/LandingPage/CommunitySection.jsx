import React from "react";
import { Link } from "react-router-dom";
import {
  FaHeartbeat,
  FaAppleAlt,
  FaRunning,
  FaUsers
} from "react-icons/fa";

const CommunitySection = () => (
  <section
    id="community"
    className="py-12 rounded-3xl shadow-lg p-8 md:p-12 mb-16 fade-in-on-scroll bg-gradient-to-br from-cyan-500 via-cyan-600 to-cyan-800 overflow-hidden border-cyan-400 backdrop-blur-xl border"
  >
    <h3 className="text-4xl font-extrabold text-gray-900 text-center mb-8 flex items-center justify-center gap-4">
      <FaUsers className="text-pink-600 text-4xl" />
      Join the Community
    </h3>
    <p className="text-gray-700 max-w-2xl mx-auto mb-8 text-center text-lg">
      Connect with others, ask questions, and share your health journey.
    </p>

    <div className="space-y-6">
      {/* Cardiology */}
      <div className="flex items-center space-x-4 bg-white/60 p-4 rounded-xl shadow-sm hover:shadow-md transition duration-300 border border-white/30">
        <div className="flex-shrink-0 w-12 h-12 bg-pink-600/50 rounded-full flex items-center justify-center text-white text-2xl">
          <FaHeartbeat />
        </div>
        <div className="flex-grow">
          <h4 className="text-xl font-bold text-gray-800">Cardiology & Heart Health</h4>
          <p className="text-gray-600">Discussions about heart conditions, fitness, and diet.</p>
        </div>
        <span className="text-sm font-semibold text-gray-700">1.2k Posts</span>
      </div>

      {/* Nutrition */}
      <div className="flex items-center space-x-4 bg-white/60 p-4 rounded-xl shadow-sm hover:shadow-md transition duration-300 border border-white/30">
        <div className="flex-shrink-0 w-12 h-12 bg-green-600/50 rounded-full flex items-center justify-center text-white text-2xl">
          <FaAppleAlt />
        </div>
        <div className="flex-grow">
          <h4 className="text-xl font-bold text-gray-800">Nutrition & Diet</h4>
          <p className="text-gray-600">Share recipes, meal plans, and tips for healthy eating.</p>
        </div>
        <span className="text-sm font-semibold text-gray-700">850 Posts</span>
      </div>

      {/* Fitness */}
      <div className="flex items-center space-x-4 bg-white/60 p-4 rounded-xl shadow-sm hover:shadow-md transition duration-300 border border-white/30">
        <div className="flex-shrink-0 w-12 h-12 bg-blue-600/50 rounded-full flex items-center justify-center text-white text-2xl">
          <FaRunning />
        </div>
        <div className="flex-grow">
          <h4 className="text-xl font-bold text-gray-800">Fitness & Exercise</h4>
          <p className="text-gray-600">Talk about workout routines, motivation, and fitness goals.</p>
        </div>
        <span className="text-sm font-semibold text-gray-700">2.1k Posts</span>
      </div>
    </div>

    <Link
      to="/community"
      className="mt-8 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition duration-300 mx-auto block text-center"
    >
      Join the Discussion
    </Link>
  </section>
);

export default CommunitySection;