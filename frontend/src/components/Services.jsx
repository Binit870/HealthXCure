"use client";
import React from "react";
import { useNavigate } from "react-router-dom";
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

const Services = () => {
  const navigate = useNavigate();

  const servicesList = [
    {
      id: 1,
      icon: FaChartLine,
      title: "Health Dashboard",
      description:
        "Your personalized overview of all health data, including key metrics, activity levels, and progress towards your wellness goals.",
      route: "/dashboard",
    },
    {
      id: 2,
      icon: FaStethoscope,
      title: "AI-Powered Symptom Checker",
      description:
        "Get an instant, AI-driven diagnosis based on your symptoms to understand potential health issues quickly and accurately.",
      route: "/symptom-checker",
    },
    {
      id: 3,
      icon: FaUserMd,
      title: "Certified Doctor Finder",
      description:
        "Easily find and connect with certified medical professionals in your area, with options to filter by specialty, location, and ratings.",
      route: "/find-doctors",
    },
    {
      id: 4,
      icon: FaRunning,
      title: "Fitness & Activity Tracker",
      description:
        "Track your workouts, set fitness goals, and monitor your daily activity to maintain a healthy and active lifestyle.",
      route: "/fitness",
    },
    {
      id: 5,
      icon: FaUtensils,
      title: "Personalized Diet & Nutrition",
      description:
        "Receive custom diet plans tailored to your health goals, dietary restrictions, and lifestyle, helping you stay on track with your wellness journey.",
      route: "/diet-planner",
    },
    {
      id: 6,
      icon: FaUsers,
      title: "Community & Support",
      description:
        "Connect with others who share similar health interests and experiences. Our community forums provide a safe space to ask questions, share knowledge, and find encouragement on your wellness journey.",
      route: "/community",
    },
    {
      id: 7,
      icon: FaFileMedicalAlt,
      title: "My Health Reports",
      description:
        "Securely store and access all your medical reports, lab results, and prescriptions in one place. Easily share them with your doctors for seamless consultations and a comprehensive health overview.",
      route: "/reports",
    },
    {
      id: 8,
      icon: FaComments,
      title: "Chat with Assistance",
      description:
        "Connect with our support team for any queries or assistance related to our services and platform.",
      route: "/chat",
    },
    {
      id: 9,
      icon: FaBell,
      title: "Notifications",
      description:
        "Stay informed with real-time updates on your appointments, lab results, and medication reminders, all in one central location.",
      route: "/notifications",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 py-16 px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our range of services designed to help you achieve a healthier, happier life.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {servicesList.map((service) => (
          <motion.div
            key={service.id}
            className="bg-white rounded-3xl p-8 text-center cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.35)] transition-all duration-300"
          >
            <service.icon className="text-5xl text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <button
              onClick={() => navigate(service.route)}
              className="mt-auto px-5 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition shadow-md shadow-black/20 hover:shadow-lg hover:shadow-black/30"
            >
              View Details
            </button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Services;
