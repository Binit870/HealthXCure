import React from "react";
import { Link } from "react-router-dom";
import healthImage from "../../assets/healthcare.png";

const HeroSection = () => (
  <section
            id="hero"
            className="relative w-full h-screen flex items-center justify-center overflow-hidden rounded-3xl shadow-lg mb-16"
          >
            {/* Full Width Background Image */}
            <img
              src={healthImage}
              alt="Health and Wellness"
              className="absolute inset-0 w-full h-full object-cover"
            />
  
            {/* Dark overlay (optional, for readability) */}
            <div className="absolute inset-0 bg-black/40"></div>
  
            {/* Text Content Overlay */}
            <div className="relative z-10 text-center px-6">
              <h2 className="text-5xl md:text-6xl font-black text-white mb-4 animate-fade-in">
                Your Partner in Health and Wellness
              </h2>
              <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8 animate-fade-in-delay">
                Manage your health from one place. Check symptoms, book appointments, find doctors, and get personalized diet plans.
              </p>
              <a
                href="#services"
                className="inline-block bg-cyan-600 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:bg-cyan-700 transition duration-300 transform hover:scale-105"
              >
                Explore Services
              </a>
            </div>
          </section>
);

export default HeroSection;
