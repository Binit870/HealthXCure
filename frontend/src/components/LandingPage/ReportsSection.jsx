import React from "react";
import { Link } from "react-router-dom";
import { FaPaperPlane } from "react-icons/fa";

const ReportsSection = () => (
  <section
    id="reports"
    className="scroll-mt-20 w-full py-10 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 rounded-3xl shadow-lg mb-16 text-center fade-in-on-scroll 
               bg-gradient-to-br from-cyan-950 via-teal-950 to-blue-950 border border-cyan-700 max-w-screen-2xl mx-auto"
  >
    <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 flex items-center justify-center gap-3">
      <FaPaperPlane className="text-cyan-400 text-2xl sm:text-3xl md:text-4xl" />
      Check Your Reports
    </h3>

    <p className="text-cyan-200 max-w-xl mx-auto mb-8 text-sm sm:text-base md:text-lg">
      Upload your medical report and our advanced AI will analyze it to provide a detailed summary and key insights.
    </p>

    <div className="rounded-2xl p-6 sm:p-8 md:p-12 border-2 border-dashed border-white/20 cursor-pointer 
                    hover:border-cyan-400/60 transition duration-300 bg-white/5 max-w-2xl mx-auto">
      <FaPaperPlane className="text-white/70 text-4xl sm:text-5xl md:text-6xl mb-4" />
      <p className="text-white font-bold text-base sm:text-lg">Drag &amp; Drop Your Report Here</p>
      <p className="text-cyan-300 text-xs sm:text-sm mt-2">or click to browse files (PDF, JPG, PNG)</p>
    </div>

    <Link
      to="/reports"
      className="mt-10 inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-teal-700 text-white font-bold 
                 py-3 px-6 sm:px-8 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition duration-300 text-sm sm:text-base"
    >
      <FaPaperPlane className="text-white text-base sm:text-lg" />
      Upload Report
    </Link>
  </section>
);

export default ReportsSection;
