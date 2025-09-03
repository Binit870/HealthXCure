import React from "react";
import { Link } from "react-router-dom";
import {
 FaHeartbeat,
  FaRunning,
  FaBed,
  FaMicroscope,
  FaCalendarCheck,
  FaMapMarkerAlt,
  FaAppleAlt,
  FaPaperPlane
   } from "react-icons/fa";

const AssistantSection = () => (
    <section id="dashboard" className="py-12 bg-gradient-to-br from-gray-800 to-gray-600 rounded-3xl shadow-lg mb-16 p-8 md:p-12 text-center text-white fade-in-on-scroll">
              <h3 className="text-4xl font-extrabold text-white mb-6">Your Personal Health Dashboard</h3>
              <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                Track your health metrics, appointments, and progress all in one place.
              </p>
              {/* Flex container to organize the grid and the button vertically */}
              <div className="flex flex-col items-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                  <div className="rounded-3xl p-6 shadow-md flex flex-col items-center text-center bg-gradient-to-br from-blue-600 to-blue-800">
                    <FaHeartbeat className="text-white text-4xl mb-3" />
                    <h4 className="text-xl font-bold mb-1 text-white">Heart Rate</h4>
                    <p className="text-white text-2xl font-bold">72 bpm</p>
                  </div>
                  <div className="rounded-3xl p-6 shadow-md flex flex-col items-center text-center bg-gradient-to-br from-emerald-600 to-teal-700">
                    <FaRunning className="text-white text-4xl mb-3" />
                    <h4 className="text-xl font-bold mb-1 text-white">Steps Today</h4>
                    <p className="text-white text-2xl font-bold">8,500</p>
                  </div>
                  <div className="rounded-3xl p-6 shadow-md flex flex-col items-center text-center bg-gradient-to-br from-purple-600 to-indigo-700">
                    <FaBed className="text-white text-4xl mb-3" />
                    <h4 className="text-xl font-bold mb-1 text-white">Sleep Score</h4>
                    <p className="text-white text-2xl font-bold">92%</p>
                  </div>
                </div>
                {/* The Link is now properly spaced below the grid with mt-8 */}
                <Link
                  to="/dashboard"
                  className="mt-8 bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                >
                  Go to Dashboard
                </Link>
              </div>
            </section>

);
export default AssistantSection;