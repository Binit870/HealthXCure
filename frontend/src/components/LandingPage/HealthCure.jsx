import React from "react";
import { Shield, Clock, Award } from "lucide-react";

const WhyChoose = () => {
  const features = [
    {
      icon: <Shield size={40} />,
      title: "Secure & Private",
      desc: "Your personal health information is fully encrypted and handled with the highest privacy standards.",
      shadow: "shadow-[0_8px_25px_0_rgba(59,130,246,0.3)]", // Blue
      gradient: "from-sky-400 to-blue-600",
      glow: "from-sky-300/40 to-blue-500/40",
    },
    {
      icon: <Clock size={40} />,
      title: "24/7 Availability",
      desc: "Access your health dashboard, reports, and insights anytime — anywhere in the world.",
      shadow: "shadow-[0_8px_25px_0_rgba(34,197,94,0.3)]", // Green
      gradient: "from-emerald-400 to-green-600",
      glow: "from-emerald-300/40 to-green-500/40",
    },
    {
      icon: <Award size={40} />,
      title: "Certified Experts",
      desc: "We connect you with verified healthcare professionals and trusted wellness partners.",
      shadow: "shadow-[0_8px_25px_0_rgba(249,115,22,0.3)]", // Orange
      gradient: "from-orange-400 to-amber-600",
      glow: "from-orange-300/40 to-amber-500/40",
    },
  ];

  return (
    <section className="py-20 bg-[#dbeeff] text-[#0b2545] text-center relative overflow-hidden">
      {/* Clean Heading Section */}
      <div className="relative mb-14">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide text-[#0b3d91]">
          Why Choose <span className="text-sky-600">HealthXCure?</span>
        </h2>

        <p className="text-[#406080] text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
          HealthXCure is designed to make healthcare more intelligent, secure, and
          accessible — helping you manage your well-being through innovation and trust.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid gap-10 md:grid-cols-3 max-w-6xl mx-auto px-6">
        {features.map((item, i) => (
          <div
            key={i}
            className={`group relative bg-white rounded-2xl p-8 border border-sky-100 
                        transition-all duration-300 hover:-translate-y-2 hover:bg-sky-50 ${item.shadow}`}
          >
            {/* Glow behind cards */}
            <div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.glow} 
                          opacity-40 blur-2xl transition-all duration-700`}
            ></div>

            {/* Icon */}
            <div
              className={`relative flex items-center justify-center w-20 h-20 mx-auto mb-6 
                          rounded-full bg-gradient-to-tr ${item.gradient} text-white 
                          shadow-lg transition-transform duration-700 
                          group-hover:scale-110`}
            >
              {item.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold mb-3 text-[#0b3d91] relative z-10">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-[#406080] text-base relative z-10 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChoose;
