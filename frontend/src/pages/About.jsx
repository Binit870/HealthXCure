"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  FaStethoscope,
  FaUserMd,
  FaUtensils,
  FaComments,
  FaBell,
  FaChartLine,
  FaRunning,
  FaUsers,
  FaFileMedicalAlt,
  FaHeartbeat,
} from "react-icons/fa";

const About = () => {
  const features = [
    {
      id: 1,
      icon: FaChartLine,
      title: "Health Dashboard",
      desc: "Track your vitals, activity, and progress with a real-time, data-driven dashboard that visualizes your health journey.",
      color: "from-sky-400 to-cyan-400",
    },
    {
      id: 2,
      icon: FaStethoscope,
      title: "AI Symptom Checker",
      desc: "Instantly analyze your symptoms with our intelligent system and receive insights on possible causes and recommendations.",
      color: "from-indigo-400 to-blue-400",
    },
    {
      id: 3,
      icon: FaUserMd,
      title: "Find Certified Doctors",
      desc: "Locate trusted healthcare professionals near you with filters for specialty, ratings, and online consultation availability.",
      color: "from-pink-400 to-rose-300",
    },
    {
      id: 4,
      icon: FaRunning,
      title: "Fitness & Activity Tracking",
      desc: "Monitor workouts, set fitness goals, and analyze performance trends with detailed insights and reminders.",
      color: "from-orange-400 to-amber-300",
    },
    {
      id: 5,
      icon: FaUtensils,
      title: "Personalized Nutrition Plans",
      desc: "AI-tailored diet suggestions based on your lifestyle, preferences, and health conditions for better eating habits.",
      color: "from-yellow-400 to-lime-300",
    },
    {
      id: 6,
      icon: FaHeartbeat,
      title: "Mental Health & Balance",
      desc: "Track stress and emotions, meditate with guided sessions, and build mindfulness for overall wellness.",
      color: "from-fuchsia-400 to-purple-300",
    },
    {
      id: 7,
      icon: FaUsers,
      title: "Community Support",
      desc: "Join discussions, share experiences, and stay motivated with people having similar health goals.",
      color: "from-green-400 to-emerald-300",
    },
    {
      id: 8,
      icon: FaFileMedicalAlt,
      title: "Digital Health Records",
      desc: "Securely upload, store, and access your medical files, prescriptions, and test results anytime.",
      color: "from-red-400 to-rose-300",
    },
    {
      id: 9,
      icon: FaComments,
      title: "AI Health Assistant",
      desc: "Get 24/7 virtual health advice and chat-based recommendations personalized just for you.",
      color: "from-teal-400 to-cyan-300",
    },
    {
      id: 10,
      icon: FaBell,
      title: "Smart Notifications",
      desc: "Get timely alerts for appointments, medication reminders, and new reports directly on your dashboard.",
      color: "from-purple-400 to-indigo-300",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 pt-24 pb-20 relative overflow-hidden">
      {/* Light background accents */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-cyan-100/40 blur-[180px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-100/40 blur-[160px] rounded-full"></div>

      <motion.div
        className="container mx-auto px-6 max-w-7xl relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-cyan-600 via-blue-500 to-indigo-400 text-transparent bg-clip-text"
          >
            Empowering Your Health Journey
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            HealthCure is your all-in-one wellness partner — combining technology,
            community, and compassion to help you live a healthier, happier life.
          </motion.p>
        </div>

        {/* Features Section */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.12, delayChildren: 0.2 },
            },
          }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={{
                hidden: { opacity: 0, scale: 0.9, y: 30 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
              }}
              className="relative group bg-white p-8 rounded-3xl border border-gray-200 transition-all duration-300 flex flex-col items-center text-center shadow-[0_4px_15px_rgba(0,0,0,0.08)]"
            >
              <div
                className={`w-20 h-20 mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-tr ${feature.color} text-white shadow-md`}
              >
                <feature.icon className="text-4xl" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
