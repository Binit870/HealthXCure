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
  className="scroll-mt-20 w-full py-8 px-4 sm:px-6 md:px-12 rounded-3xl shadow-lg mb-16 fade-in-on-scroll 
             bg-gradient-to-br from-cyan-500 via-cyan-600 to-cyan-800 overflow-hidden border-cyan-400 
             backdrop-blur-xl border max-w-screen-2xl mx-auto"
>

    <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-8 flex items-center justify-center gap-4">
      <FaUsers className="text-pink-600 text-3xl md:text-4xl" />
      Join the Community
    </h3>
    <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto mb-8 text-center">
      Connect with others, ask questions, and share your health journey.
    </p>

    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {/* Cardiology */}
      <div className="flex items-center space-x-4 bg-white/60 p-4 rounded-xl shadow-sm hover:shadow-md transition duration-300 border border-white/30">
        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-pink-600/50 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl">
          <FaHeartbeat />
        </div>
        <div className="flex-grow">
          <h4 className="text-lg md:text-xl font-bold text-gray-800">Cardiology & Heart Health</h4>
          <p className="text-gray-600 text-sm md:text-base">Discussions about heart conditions, fitness, and diet.</p>
        </div>
        <span className="text-xs md:text-sm font-semibold text-gray-700">1.2k Posts</span>
      </div>

      {/* Nutrition */}
      <div className="flex items-center space-x-4 bg-white/60 p-4 rounded-xl shadow-sm hover:shadow-md transition duration-300 border border-white/30">
        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-green-600/50 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl">
          <FaAppleAlt />
        </div>
        <div className="flex-grow">
          <h4 className="text-lg md:text-xl font-bold text-gray-800">Nutrition & Diet</h4>
          <p className="text-gray-600 text-sm md:text-base">Share recipes, meal plans, and tips for healthy eating.</p>
        </div>
        <span className="text-xs md:text-sm font-semibold text-gray-700">850 Posts</span>
      </div>

      {/* Fitness */}
      <div className="flex items-center space-x-4 bg-white/60 p-4 rounded-xl shadow-sm hover:shadow-md transition duration-300 border border-white/30">
        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-600/50 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl">
          <FaRunning />
        </div>
        <div className="flex-grow">
          <h4 className="text-lg md:text-xl font-bold text-gray-800">Fitness & Exercise</h4>
          <p className="text-gray-600 text-sm md:text-base">Talk about workout routines, motivation, and fitness goals.</p>
        </div>
        <span className="text-xs md:text-sm font-semibold text-gray-700">2.1k Posts</span>
      </div>
    </div>

    <Link
      to="/community"
      className="mt-10 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition duration-300 mx-auto block text-center w-fit"
    >
      Join the Discussion
    </Link>
  </section>
);

export default CommunitySection;
