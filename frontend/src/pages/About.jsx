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
      desc: "Our interactive Health Dashboard helps you visualize your overall wellness. Track vital signs like heart rate, sleep, and calories burned. It gathers your daily activity, nutrition, and fitness stats in one place so you can clearly see how your health is improving over time.",
      color: "from-sky-700 to-cyan-600",
    },
    {
      id: 2,
      icon: FaStethoscope,
      title: "AI Symptom Checker",
      desc: "Feeling unwell but unsure why? Simply describe your symptoms, and our AI-powered system will analyze them instantly. It provides you with a list of possible causes, next steps, and when to consult a doctor — helping you make smarter health decisions quickly.",
      color: "from-blue-700 to-indigo-600",
    },
    {
      id: 3,
      icon: FaUserMd,
      title: "Find Certified Doctors",
      desc: "Easily search for qualified doctors nearby by specialization, experience, and patient reviews. You can check availability for online consultations or in-person visits and even book appointments directly from the app — saving you time and effort.",
      color: "from-sky-800 to-blue-700",
    },
    {
      id: 4,
      icon: FaRunning,
      title: "Fitness & Activity Tracking",
      desc: "Whether you’re walking, running, or hitting the gym — track your workouts with precision. Set personal fitness goals, receive weekly performance summaries, and stay motivated with progress insights that help you stay active and consistent.",
      color: "from-cyan-700 to-sky-600",
    },
    {
      id: 5,
      icon: FaUtensils,
      title: "Personalized Nutrition Plans",
      desc: "Get AI-generated diet plans that perfectly match your health goals. Whether you want to lose weight, gain muscle, or manage a medical condition, our smart nutrition system creates a daily meal guide with balanced nutrients and easy recipes.",
      color: "from-blue-800 to-sky-700",
    },
    {
      id: 6,
      icon: FaHeartbeat,
      title: "Mental Health & Balance",
      desc: "Your mental well-being matters. HealthCure offers tools to monitor stress levels, practice mindfulness, and improve emotional stability. Enjoy guided meditation sessions, breathing exercises, and mood tracking to help you feel calm and balanced.",
      color: "from-indigo-800 to-purple-700",
    },
    {
      id: 7,
      icon: FaUsers,
      title: "Community Support",
      desc: "Join a supportive community of health enthusiasts. Discuss your challenges, share success stories, and get motivation from others with similar fitness and wellness goals. Together, you’ll build a positive environment that keeps you going.",
      color: "from-sky-700 to-blue-600",
    },
    {
      id: 8,
      icon: FaFileMedicalAlt,
      title: "Digital Health Records",
      desc: "Keep all your health documents safe and accessible in one secure digital folder. Upload prescriptions, test reports, and doctor’s notes. Access them anytime, anywhere — no more lost papers or scattered reports.",
      color: "from-cyan-700 to-sky-600",
    },
    {
      id: 9,
      icon: FaComments,
      title: "AI Health Assistant",
      desc: "Our intelligent chatbot is available 24/7 to answer your health-related questions. From daily wellness tips to medication reminders and lifestyle suggestions — it acts as your personal virtual health companion.",
      color: "from-blue-700 to-cyan-600",
    },
    {
      id: 10,
      icon: FaBell,
      title: "Smart Notifications",
      desc: "Never miss a thing with personalized alerts for doctor visits, test results, and medicines. You’ll also get reminders for upcoming checkups, new health insights, and wellness milestones — keeping your health routine on track.",
      color: "from-indigo-700 to-sky-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-cyan-50 to-white text-gray-100 pt-24 pb-20 relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-sky-200/40 blur-[180px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-200/40 blur-[160px] rounded-full"></div>

      <motion.div
        className="container mx-auto px-6 max-w-7xl relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-sky-700 via-blue-600 to-cyan-500 text-transparent bg-clip-text"
          >
            Empowering Your Health Journey
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-gray-700 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            HealthCure combines technology, medical expertise, and personal care
            to help you take control of your health — from physical fitness to mental well-being — all in one powerful platform.
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
                scale: 1.05,
                boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
              }}
              className={`relative group bg-gradient-to-tr ${feature.color} p-8 rounded-3xl transition-all duration-300 flex flex-col items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_30px_rgba(0,0,0,0.15)]`}
            >
              <div className="w-20 h-20 mb-6 flex items-center justify-center rounded-2xl bg-white/20 text-white shadow-inner backdrop-blur-sm">
                <feature.icon className="text-4xl drop-shadow-md" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-white/90 text-sm leading-relaxed">
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
