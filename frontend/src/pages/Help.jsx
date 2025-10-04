import React from "react";
import { FaPhoneAlt, FaBookOpen, FaQuestionCircle } from "react-icons/fa";
import { AiFillTool } from "react-icons/ai";
import { MdSecurity } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { GiMeal } from "react-icons/gi"; // new icon for diet plan
import { IoNotifications } from "react-icons/io5"; // new icon for notifications

const helpTopics = [
  {
    title: "1. Contact Support",
    text: "Reach out to our 24/7 support team for technical issues, appointment help, or general queries.",
    icon: <FaPhoneAlt className="mr-2" />,
  },
  {
    title: "2. Personalized Diet Plan",
    text: "Get customized diet recommendations based on your health goals, preferences, and medical history.",
    icon: <GiMeal className="mr-2" />,
  },
  {
    title: "3. FAQs",
    text: "Find answers to the most common questions about using HealthCure and its features.",
    icon: <FaQuestionCircle className="mr-2" />,
  },
  {
    title: "4. Notification Options",
    text: "Stay updated with timely reminders for appointments, health tips, and important updates via alerts.",
    icon: <IoNotifications className="mr-2" />,
  },
  {
    title: "5. Data Security",
    text: "Learn how we keep your medical and personal data safe with encryption and compliance measures.",
    icon: <MdSecurity className="mr-2" />,
  },
  {
    title: "6. Community Support",
    text: "Join our community forums to connect with other users, share experiences, and get peer-to-peer support.",
    icon: <RiTeamFill className="mr-2" />,
  },
];

const Help = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-cyan-800 to-cyan-950 text-gray-200 px-6 py-12">
      {/* Heading */}
      <div className="flex items-center justify-center gap-3 mb-10">
        <FaQuestionCircle className="w-10 h-10 text-green-400" />
        <h1
          className="text-5xl md:text-6xl font-extrabold text-center 
                     bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 
                     bg-clip-text text-transparent tracking-tight"
        >
          Help & Support
        </h1>
      </div>

      {/* Grid of cards */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {helpTopics.map((topic, i) => (
          <section
            key={i}
            className="relative p-6 bg-gray-800 rounded-2xl border border-gray-700 
                       shadow-lg shadow-cyan-600 transition-transform transform 
                       hover:-translate-y-1 hover:shadow-cyan-400 overflow-hidden"
          >
            {/* Glow */}
            <div className="absolute inset-0 rounded-2xl 
                            bg-gradient-to-r from-cyan-400 to-teal-400 
                            opacity-0 hover:opacity-20 blur-xl transition duration-500 pointer-events-none"></div>

            {/* Title with Icon */}
            <h2 className="text-2xl font-semibold text-cyan-400 mb-3 flex items-center">
              {topic.icon} {topic.title}
            </h2>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed">{topic.text}</p>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Help;
