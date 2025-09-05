import React from "react";
import { motion } from "framer-motion";
import { FaHeartbeat,FaUtensils, FaUserMd, FaNotesMedical,FaStethoscope, FaRobot, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const About = () => {
  // Framer Motion variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const featureItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50 text-gray-800 font-sans pt-24 pb-12">
      <motion.div
        className="container mx-auto px-6 max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-900 leading-tight mb-4 drop-shadow-md">
            Your Partner in Health and Wellness
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            At HealthCure, we believe that health is a journey, not a destination. We're here to empower you with innovative tools and compassionate support to take control of your well-being.
          </p>
        </motion.div>

        <motion.hr variants={itemVariants} className="my-12 border-t-2 border-indigo-200" />

        {/* Our Mission */}
        <motion.div className="mb-16" variants={itemVariants}>
          <div className="flex flex-col md:flex-row items-center bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-indigo-200">
            <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0">
              <h2 className="text-4xl font-bold text-indigo-800 mb-4">Our Mission</h2>
              <p className="text-lg text-gray-700">
                To make personalized healthcare accessible and effortless for everyone. We combine advanced AI with expert knowledge to provide you with accurate insights, connect you with the right professionals, and guide you towards a healthier lifestyle.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <FaHeartbeat className="text-7xl md:text-9xl text-pink-500 animate-pulse-slow" />
            </div>
          </div>
        </motion.div>

        {/* Our Services */}
        <motion.div className="mb-16" variants={itemVariants}>
          <h2 className="text-4xl font-bold text-center text-indigo-800 mb-10">What We Offer</h2>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants}>
            
            <motion.div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center text-center transition-transform hover:scale-105" variants={featureItemVariants}>
              <FaStethoscope className="text-5xl text-indigo-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Symptom Checker & Diagnosis</h3>
              <p className="text-gray-600">Get an instant, AI-powered preliminary diagnosis by entering your symptoms, helping you understand your health better.</p>
            </motion.div>

            <motion.div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center text-center transition-transform hover:scale-105" variants={featureItemVariants}>
              <FaUserMd className="text-5xl text-pink-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Find & Book Doctors</h3>
              <p className="text-gray-600">Easily find certified doctors in your area and book appointments online. Filter by specialty, rating, and location.</p>
            </motion.div>

            <motion.div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center text-center transition-transform hover:scale-105" variants={featureItemVariants}>
              <FaNotesMedical className="text-5xl text-green-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Digital Health Records</h3>
              <p className="text-gray-600">Securely store and manage all your medical reports and prescriptions in one place, accessible anytime, anywhere.</p>
            </motion.div>

            <motion.div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center text-center transition-transform hover:scale-105" variants={featureItemVariants}>
              <FaRobot className="text-5xl text-indigo-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">AI Health Assistant</h3>
              <p className="text-gray-600">Chat with our AI assistant for instant answers to your health questions, from medication queries to wellness tips.</p>
            </motion.div>

            <motion.div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center text-center transition-transform hover:scale-105" variants={featureItemVariants}>
              <FaUtensils className="text-5xl text-yellow-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Personalized Diet Planner</h3>
              <p className="text-gray-600">Get a custom diet plan based on your health goals, allergies, and lifestyle preferences, powered by AI.</p>
            </motion.div>

            <motion.div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center text-center transition-transform hover:scale-105" variants={featureItemVariants}>
              <FaShieldAlt className="text-5xl text-blue-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Data Security</h3>
              <p className="text-gray-600">Your privacy is our priority. We use industry-standard encryption to ensure your personal health data is always secure.</p>
            </motion.div>

          </motion.div>
        </motion.div>

        <motion.hr variants={itemVariants} className="my-12 border-t-2 border-indigo-200" />

        {/* Call to Action */}
        <motion.div className="text-center" variants={itemVariants}>
          <h2 className="text-4xl font-bold text-indigo-800 mb-4">Ready to Start Your Health Journey?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join HealthCure today and experience a new way to manage your health with ease and confidence.
          </p>
          <Link
            to="/"
            className="px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-105"
          >
            Get Started
          </Link>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default About;