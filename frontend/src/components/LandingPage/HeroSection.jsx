import React from "react";
import { Link } from "react-router-dom";
import healthImage from "../../assets/healthcare.png";

const HeroSection = () => (
  <section
  id="hero"
  className="scroll-mt-20 pt-20 sm:pt-24 relative w-full h-[90vh] sm:h-screen flex items-center justify-center overflow-hidden rounded-3xl shadow-lg mb-16 max-w-screen-2xl mx-auto"
>

    {/* Full Width Background Image */}
    <img
      src={healthImage}
      alt="Health and Wellness"
      className="absolute inset-0 w-full h-full object-cover"
    />

    {/* Dark overlay for readability */}
    <div className="absolute inset-0 bg-black/40"></div>

    {/* Text Content Overlay */}
    <div className="relative z-10 text-center px-4 sm:px-6 md:px-12">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 animate-fade-in leading-tight">
        Your Partner in Health and Wellness
      </h2>
      <h3 className="text-lg sm:text-xl md:text-2xl text-white font-semibold mb-4 animate-fade-in-delay">
        Trusted care, anytime, anywhere.
      </h3>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white max-w-3xl mx-auto mb-6 animate-fade-in-delay">
        Manage your health from one place. Check symptoms, find doctors, and get personalized diet plans and fitness plans.
      </p>

      <a
        href="#services"
        className="inline-block bg-cyan-600 text-white font-bold py-3 px-8 sm:py-4 sm:px-10 rounded-full shadow-lg hover:bg-cyan-700 transition duration-300 transform hover:scale-105 text-sm sm:text-base"
      >
        Explore Services
      </a>
    </div>
  </section>
);

export default HeroSection;
