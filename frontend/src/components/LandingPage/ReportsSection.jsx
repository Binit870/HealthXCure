import React from "react";
import { Link } from "react-router-dom";
import {   FaHeartbeat,
  FaRunning,
  FaBed,
  FaMicroscope,
  FaCalendarCheck,
  FaMapMarkerAlt,
  FaAppleAlt,
  FaPaperPlane } from "react-icons/fa";

const AssistantSection = () => (
<section
  id="reports"
  className="py-12 rounded-3xl shadow-lg mb-16 p-8 md:p-12 text-center fade-in-on-scroll bg-white/10 backdrop-blur-xl border border-white/10"
>
  <h3 className="text-4xl font-extrabold text-white mb-6">Check Your Reports</h3>
  <p className="text-gray-200 max-w-xl mx-auto mb-8">
    Upload your medical report and our advanced AI will analyze it to provide a detailed summary and key insights.
  </p>
  <div className="rounded-2xl p-6 md:p-12 border-2 border-dashed border-white/20 cursor-pointer hover:border-blue-400/60 transition duration-300 bg-white/5">
    <i className="fas fa-file-upload text-white/70 text-6xl mb-4"></i>
    <p className="text-white font-bold text-lg">Drag &amp; Drop Your Report Here</p>
    <p className="text-gray-300 text-sm mt-2">or click to browse files (PDF, JPG, PNG)</p>
  </div>
  <Link
    to="/reports"
    className="mt-8 inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
  >
    Upload Report
  </Link>
</section>
);
export default AssistantSection;