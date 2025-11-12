import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // assuming you have this
import { FaArrowRight } from "react-icons/fa";
import healthImage from "../../assets/healthcare.png";

const HeroSection = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth(); // from your context

  const handleGetStarted = () => {
    if (isLoggedIn) navigate("/symptom-checker");
    else navigate("/login");
  };

  const handleDashboard = () => {
    if (isLoggedIn) navigate("/dashboard");
    else navigate("/login");
  };

  return (
    <section
      id="hero"
      className="scroll-mt-20 pt-20 sm:pt-24 relative w-full h-[90vh] sm:h-screen flex items-center justify-center overflow-hidden rounded-3xl shadow-lg mb-16 max-w-screen-2xl mx-auto"
    >
      {/* Background Image */}
      <img
        src={healthImage}
        alt="Health and Wellness"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Light Teal Overlay */}
      <div className="absolute inset-0 bg-teal-400/40"></div>

      {/* Dark Gradient Overlay for readability */}
      <div className="absolute inset-0 bg-cyan-900/50"></div>

      {/* Text Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 animate-fade-in leading-tight text-white">
          Your Health, Our Priority
        </h2>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 animate-fade-in leading-tight text-white">
          Your Partner in <span className="text-teal-300">Health and Wellness</span>
        </h2>

        <h3 className="text-lg sm:text-xl md:text-2xl text-white font-semibold mb-4 animate-fade-in-delay">
          Trusted care, anytime, anywhere.
        </h3>

        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white max-w-3xl mx-auto mb-8 animate-fade-in-delay">
          Manage your health from one place. Check symptoms, find doctors, and get
          personalized diet and fitness plans powered by AI.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
  {/* Get Started Button (Teal) */}
  <button
    onClick={handleGetStarted}
    className="inline-flex items-center justify-center bg-teal-600 text-white font-bold 
               py-3 px-8 sm:py-4 sm:px-10 rounded-full shadow-lg 
               hover:bg-white hover:text-teal-700 hover:shadow-xl transition duration-300 transform hover:scale-105 
               text-sm sm:text-base"
  >
    Get Started <FaArrowRight className="ml-2" />
  </button>

  {/* Dashboard Button (White Outline) */}
  <button
    onClick={handleDashboard}
    className="inline-flex items-center justify-center bg-white text-teal-700 font-bold 
               py-3 px-8 sm:py-4 sm:px-10 rounded-full shadow-lg border-2 border-teal-600 
               hover:bg-teal-700 hover:text-white hover:shadow-xl 
               transition duration-300 transform hover:scale-105 
               text-sm sm:text-base"
  >
    Go to Dashboard <FaArrowRight className="ml-2" />
  </button>
</div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
