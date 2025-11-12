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
} from "react-icons/fa";

const About = () => {
  const features = [
    {
      id: 1,
      icon: FaChartLine,
      title: "Health Dashboard — Track & Analyze Progress",
      desc: "Visualize your health metrics in real-time. Monitor your heart rate, calories, sleep patterns, and fitness goals all in one place. Receive weekly reports and personalized recommendations to help you improve your lifestyle.",
      border: "border-teal-400",
    },
    {
      id: 2,
      icon: FaStethoscope,
      title: "AI Symptom Checker — Get Instant Insights",
      desc: "Describe your symptoms and receive AI-powered health suggestions within seconds. Identify possible causes, learn self-care steps, and understand when it’s time to consult a doctor.",
      border: "border-cyan-400",
    },
    {
      id: 3,
      icon: FaUserMd,
      title: "Find Certified Doctors — Anytime, Anywhere",
      desc: "Easily find trusted medical professionals near you. View ratings, reviews, and book online consultations directly — fast, reliable, and convenient healthcare access.",
      border: "border-blue-400",
    },
    {
      id: 4,
      icon: FaRunning,
      title: "Fitness & Activity Tracker — Stay Motivated Daily",
      desc: "Track every step, workout, and calorie burned. Set realistic fitness goals, get weekly insights, and stay consistent with progress reminders that keep you moving forward.",
      border: "border-emerald-400",
    },
    {
      id: 5,
      icon: FaUtensils,
      title: "Personalized Nutrition Plans — Eat Smarter",
      desc: "Get AI-curated diet plans customized for your goals. Track calories, balance nutrients, and follow meal recommendations that fit your lifestyle and fitness routine.",
      border: "border-lime-400",
    },
    {
      id: 6,
      icon: FaUsers,
      title: "Community Support — Share & Grow Together",
      desc: "Connect with a supportive health community. Exchange tips, share milestones, and find motivation from others pursuing similar wellness journeys.",
      border: "border-sky-400",
    },
    {
      id: 7,
      icon: FaFileMedicalAlt,
      title: "Digital Health Records — Safe & Accessible",
      desc: "Keep all your prescriptions, test reports, and medical history securely organized. Access your records anytime, anywhere — safe, simple, and reliable.",
      border: "border-indigo-400",
    },
    {
      id: 8,
      icon: FaComments,
      title: "AI Health Assistant — Your 24/7 Smart Companion",
      desc: "Ask health-related questions, get reminders, and receive personalized wellness tips anytime. Your virtual medical buddy is always available to guide you.",
      border: "border-cyan-400",
    },
    {
      id: 9,
      icon: FaBell,
      title: "Smart Notifications — Stay on Track",
      desc: "Get timely reminders for medications, appointments, and health checkups. Never miss an update with intelligent alerts tailored to your schedule.",
      border: "border-teal-400",
    },
  ];

  return (
    <div className="min-h-screen bg-teal-100 text-gray-900 pt-28 pb-28 relative overflow-x-hidden overflow-y-visible">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-teal-200/40 blur-[200px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-200/40 blur-[180px] rounded-full"></div>

      <motion.div
        className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10"
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
            className="text-5xl md:text-6xl font-extrabold mb-6 text-teal-700 leading-tight"
          >
            Empowering Your <span className="text-teal-600">Health Journey</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-gray-700 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed"
          >
            <span className="font-semibold text-teal-800">HealthXCure</span> blends AI technology,
            medical expertise, and personalized care to help you manage your health effectively. From
            tracking fitness and nutrition to connecting with doctors and analyzing reports, we
            provide everything you need to live healthier, stronger, and smarter — all in one
            intelligent platform.
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
                boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
              }}
              className={`relative group bg-white border ${feature.border} p-8 rounded-3xl transition-all duration-300 shadow-md hover:shadow-2xl hover:border-teal-500/80`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-teal-50 text-teal-700 shadow-inner">
                  <feature.icon className="text-3xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 leading-snug">
                  {feature.title}
                </h3>
              </div>
              <p className="text-black text-base leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
