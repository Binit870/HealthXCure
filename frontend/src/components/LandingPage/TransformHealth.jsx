import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaClock, FaUserMd } from "react-icons/fa";

const TransformHealth = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-6 bg-[#d3e8ff] text-center text-gray-900 min-h-screen">
      <h2 className="text-4xl font-extrabold mb-4 text-gray-900">
        Ready to <span className="text-sky-700">Transform</span> Your Health?
      </h2>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-12">
        Join thousands of users who trust{" "}
        <span className="font-semibold text-sky-700">HealthXCure</span> for their
        wellness journey — empowering you to take control of your health.
      </p>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Secure & Private */}
        <div className="p-8 rounded-2xl bg-white border border-blue-300 shadow-[0_10px_30px_rgba(59,130,246,0.3)] hover:scale-105 hover:shadow-[0_15px_35px_rgba(59,130,246,0.4)] transition duration-300">
          <div className="bg-blue-100 w-16 h-16 flex items-center justify-center mx-auto rounded-full text-blue-600 mb-4">
            <FaLock size={28} />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Secure & Private</h3>
          <p className="text-gray-600">
            Your health data is encrypted and protected at every step.
          </p>
        </div>

        {/* 24/7 Available */}
        <div className="p-8 rounded-2xl bg-white border border-sky-300 shadow-[0_10px_30px_rgba(56,189,248,0.3)] hover:scale-105 hover:shadow-[0_15px_35px_rgba(56,189,248,0.4)] transition duration-300">
          <div className="bg-sky-100 w-16 h-16 flex items-center justify-center mx-auto rounded-full text-sky-600 mb-4">
            <FaClock size={28} />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">24/7 Available</h3>
          <p className="text-gray-600">
            Access your health information anytime, anywhere with ease.
          </p>
        </div>

        {/* Certified Experts */}
        <div className="p-8 rounded-2xl bg-white border border-emerald-300 shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:scale-105 hover:shadow-[0_15px_35px_rgba(16,185,129,0.4)] transition duration-300">
          <div className="bg-emerald-100 w-16 h-16 flex items-center justify-center mx-auto rounded-full text-emerald-600 mb-4">
            <FaUserMd size={28} />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Certified Experts</h3>
          <p className="text-gray-600">
            Connect with trusted and verified healthcare professionals.
          </p>
        </div>
      </div>

      {/* Button Section */}
      <div className="mt-12">
        <button
          onClick={() => navigate("/symptom-checker")}
          className="inline-block px-8 py-3 text-lg font-semibold text-white 
                     bg-gradient-to-r from-sky-700 via-sky-600 to-emerald-600 
                     rounded-full shadow-md hover:scale-105 hover:shadow-xl 
                     transition duration-300"
        >
          Start Your Journey
        </button>
      </div>
    </section>
  );
};

export default TransformHealth;
