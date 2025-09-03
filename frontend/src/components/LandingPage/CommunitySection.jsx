import React from "react";
import { Link } from "react-router-dom";
import {  FaHeartbeat,
  FaRunning,
  FaBed,
  FaMicroscope,
  FaCalendarCheck,
  FaMapMarkerAlt,
  FaAppleAlt,
  FaPaperPlane } from "react-icons/fa";

const CommunitySection = () => (
  <section id="community" className="py-12 rounded-3xl shadow-lg p-8 md:p-12 mb-16 fade-in-on-scroll bg-white/10 backdrop-blur-xl border border-white/10">
            <h3 className="text-4xl font-extrabold text-white text-center mb-8">Join the Community</h3>
            <p className="text-gray-200 max-w-2xl mx-auto mb-8 text-center">
              Connect with others, ask questions, and share your health journey.
            </p>
            <div className="space-y-6">
              <div className="flex items-center space-x-4 bg-white/10 p-4 rounded-xl shadow-sm hover:shadow-md transition duration-300 border border-white/10">
                <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white text-2xl">
                  <i className="fas fa-heart"></i>
                </div>
                <div className="flex-grow">
                  <h4 className="text-xl font-bold text-white">Cardiology & Heart Health</h4>
                  <p className="text-gray-200">Discussions about heart conditions, fitness, and diet.</p>
                </div>
                <span className="text-sm font-semibold text-gray-200">1.2k Posts</span>
              </div>
  
              <div className="flex items-center space-x-4 bg-white/10 p-4 rounded-xl shadow-sm hover:shadow-md transition duration-300 border border-white/10">
                <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white text-2xl">
                  <i className="fas fa-apple-alt"></i>
                </div>
                <div className="flex-grow">
                  <h4 className="text-xl font-bold text-white">Nutrition & Diet</h4>
                  <p className="text-gray-200">Share recipes, meal plans, and tips for healthy eating.</p>
                </div>
                <span className="text-sm font-semibold text-gray-200">850 Posts</span>
              </div>
  
              <div className="flex items-center space-x-4 bg-white/10 p-4 rounded-xl shadow-sm hover:shadow-md transition duration-300 border border-white/10">
                <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white text-2xl">
                  <i className="fas fa-running"></i>
                </div>
                <div className="flex-grow">
                  <h4 className="text-xl font-bold text-white">Fitness & Exercise</h4>
                  <p className="text-gray-200">Talk about workout routines, motivation, and fitness goals.</p>
                </div>
                <span className="text-sm font-semibold text-gray-200">2.1k Posts</span>
              </div>
            </div>
            {/* Changed button to Link for routing */}
            <Link
              to="/community"
              className="mt-8 bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 mx-auto block text-center"
            >
              Join the Discussion
            </Link>
          </section>
);

export default CommunitySection;
