import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
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

const Services = () => {
  const [activeFeatureId, setActiveFeatureId] = useState(null);
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const featureVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const servicesList = [
    {
      id: 1,
      icon: FaChartLine,
      title: "Health Dashboard",
      description:
        "Your personalized overview of all health data, including key metrics, activity levels, and progress towards your wellness goals.",
      color: "text-blue-400",
      route: "/dashboard",
    },
    {
      id: 2,
      icon: FaStethoscope,
      title: "AI-Powered Symptom Checker",
      description:
        "Get an instant, AI-driven diagnosis based on your symptoms to understand potential health issues quickly and accurately.",
      color: "text-indigo-400",
      route: "/symptom-checker",
    },
    {
      id: 3,
      icon: FaUserMd,
      title: "Certified Doctor Finder",
      description:
        "Easily find and connect with certified medical professionals in your area, with options to filter by specialty, location, and ratings.",
      color: "text-pink-400",
      route: "/find-doctors",
    },
    {
      id: 4,
      icon: FaRunning,
      title: "Fitness & Activity Tracker",
      description:
        "Track your workouts, set fitness goals, and monitor your daily activity to maintain a healthy and active lifestyle.",
      color: "text-orange-400",
      route: "/fitness",
    },
    {
      id: 5,
      icon: FaUtensils,
      title: "Personalized Diet & Nutrition",
      description:
        "Receive custom diet plans tailored to your health goals, dietary restrictions, and lifestyle, helping you stay on track with your wellness journey.",
      color: "text-yellow-400",
      route: "/diet-planner",
    },
    {
      id: 6,
      icon: FaUsers,
      title: "Community & Support",
      description:
        "Connect with others who share similar health interests and experiences. Our community forums provide a safe space to ask questions, share knowledge, and find encouragement on your wellness journey.",
      color: "text-green-400",
      route: "/community",
    },
    {
      id: 7,
      icon: FaFileMedicalAlt,
      title: "My Health Reports",
      description:
        "Securely store and access all your medical reports, lab results, and prescriptions in one place. Easily share them with your doctors for seamless consultations and a comprehensive health overview.",
      color: "text-red-400",
      route: "/my-reports",
    },
    {
      id: 8,
      icon: FaComments,
      title: "Chat with Assistance",
      description:
        "Connect with our support team for any queries or assistance related to our services and platform.",
      color: "text-teal-400",
      route: "/chat-assistance",
    },
    {
      id: 9,
      icon: FaBell,
      title: "Notifications",
      description:
        "Stay informed with real-time updates on your appointments, lab results, and medication reminders, all in one central location.",
      color: "text-purple-400",
      route: "/notifications",
    },
  ];

  const handleFeatureClick = (id, route) => {
    setActiveFeatureId(id);
    if (route) {
      navigate(route);
    }
  };

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
              backgroundImage:
                "linear-gradient(to bottom, #E0E0E0 0%, #A0A0A0 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              textShadow: "0 2px 5px rgba(0,0,0,0.5)",
            }}
          >
            Our Comprehensive Health Services
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300 mt-4">
            At HealthCure, we offer a wide range of services designed to make
            your health journey simple, efficient, and personalized.
          </p>
        </motion.div>

        <motion.hr
          variants={itemVariants}
          className="my-12 border-t border-gray-600"
        />

        {/* Services Grid */}
        <motion.div className="mb-16" variants={itemVariants}>
          <h2 className="text-4xl font-bold text-center text-gray-200 mb-10">
            Explore Our Offerings
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {servicesList.map((service) => (
              <motion.div
                key={service.id}
                className={`
                  bg-white/10 backdrop-blur-sm rounded-3xl p-8 flex flex-col items-center text-center cursor-pointer
                  transition-all duration-500 ease-in-out
                  shadow-lg shadow-blue-400/30 hover:shadow-blue-400/70
                  ${activeFeatureId === service.id
                    ? "scale-105 border border-blue-400"
                    : "hover:scale-105"
                  }
                `}
                variants={featureVariants}
                onClick={() => handleFeatureClick(service.id, service.route)}
              >
                <service.icon className={`text-5xl mb-4 ${service.color}`} />
                <h3 className="text-xl font-extrabold mb-2 text-white">
                  {service.title}
                </h3>
                <p className="text-gray-300 mb-4">{service.description}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFeatureClick(service.id, service.route);
                  }}
                  className="mt-auto px-6 py-2 bg-[#4682B4] text-white rounded-full hover:bg-[#5A9BD6] transition
                          shadow-md shadow-[#4682B4]/50 hover:shadow-lg hover:shadow-[#4682B4]/70"
                >
                  View
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Services;