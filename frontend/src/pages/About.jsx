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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  const featureVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const features = [
    {
      id: 1,
      icon: FaChartLine,
      title: "Health Dashboard",
      description:
        "Your personalized overview of all health data, including key metrics, activity levels, and progress toward your wellness goals.",
      color: "text-blue-400",
    },
    {
      id: 2,
      icon: FaStethoscope,
      title: "AI-Powered Symptom Checker",
      description:
        "Get an instant, AI-driven diagnosis based on your symptoms to understand potential health issues quickly and accurately.",
      color: "text-indigo-400",
    },
    {
      id: 3,
      icon: FaUserMd,
      title: "Certified Doctor Finder",
      description:
        "Easily find and connect with certified medical professionals in your area, with options to filter by specialty, location, and ratings.",
      color: "text-pink-400",
    },
    {
      id: 4,
      icon: FaRunning,
      title: "Fitness & Activity Tracker",
      description:
        "Track your workouts, set fitness goals, and monitor your daily activity to maintain a healthy and active lifestyle.",
      color: "text-orange-400",
    },
    {
      id: 5,
      icon: FaUtensils,
      title: "Personalized Diet & Nutrition",
      description:
        "Receive custom diet plans tailored to your health goals, dietary restrictions, and lifestyle, helping you stay on track with your wellness journey.",
      color: "text-yellow-400",
    },
    {
      id: 6,
      icon: FaUsers,
      title: "Community & Support",
      description:
        "Connect with others who share similar health interests and experiences. Our community forums provide a safe space to ask questions, share knowledge, and find encouragement on your wellness journey.",
      color: "text-green-400",
    },
    {
      id: 7,
      icon: FaFileMedicalAlt,
      title: "My Health Reports",
      description:
        "Securely store and access all your medical reports, lab results, and prescriptions in one place. Easily share them with your doctors for seamless consultations and a comprehensive health overview.",
      color: "text-red-400",
    },
    {
      id: 8,
      icon: FaComments,
      title: "Chat with Assistance",
      description:
        "Connect with our support team for any queries or assistance related to our services and platform.",
      color: "text-teal-400",
    },
    {
      id: 9,
      icon: FaBell,
      title: "Notifications",
      description:
        "Stay informed with real-time updates on your appointments, lab results, and medication reminders, all in one central, easy-to-manage location.",
      color: "text-purple-400",
    },
  ];

  return (
    <div
      className="font-sans pt-24 pb-12 min-h-screen text-gray-100"
      style={{
        backgroundColor: "#2F4F4F",
      }}
    >
      <motion.div
        className="container mx-auto px-6 max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.div className="text-center mb-16 relative" variants={itemVariants}>
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ zIndex: -1 }}
          >
            <div
              className="w-[420px] h-[160px] rounded-full blur-2xl opacity-40"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 80%)",
              }}
            ></div>
          </div>
          <h1
            className="text-5xl md:text-6xl font-extrabold mb-0 relative"
            style={{
              color: "transparent",
              backgroundImage: "linear-gradient(to bottom, #E0E0E0 0%, #A0A0A0 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              textShadow: "0 2px 5px rgba(0,0,0,0.5)",
            }}
          >
            Your Partner in Health and Wellness
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300 mt-4">
            At HealthCure, we believe that health is a journey, not a destination. We're here to empower you with innovative tools and compassionate support.
          </p>
        </motion.div>

        <motion.hr
          variants={itemVariants}
          className="my-12 border-t border-gray-600"
        />

        {/* Features Grid */}
        <motion.div className="mb-16" variants={itemVariants}>
          <h2 className="text-4xl font-bold text-center text-gray-200 mb-10">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                className={`
                  bg-white/5 backdrop-blur-sm rounded-3xl p-8 flex flex-col items-center text-center
                  transition-all duration-300 ease-in-out
                  border border-transparent hover:border-blue-400
                  hover:bg-white/10
                `}
                variants={featureVariants}
              >
                <feature.icon className={`text-5xl mb-4 ${feature.color}`} />
                <h3 className="text-xl font-extrabold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;