import React from "react";
import { Link } from "react-router-dom";
import { Shield, Clock, Award } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";

const WhyChoose = () => {
  const features = [
    {
      icon: <Shield size={36} />,
      title: "Secure & Private",
      desc: "Your personal health information is fully encrypted and handled with the highest privacy standards.",
      color: "cyan",
      bgLight: "bg-cyan-100",
      textColor: "text-cyan-600",
      border: "border-cyan-400",
      gradient: "from-cyan-600 to-cyan-700",
    },
    {
      icon: <Clock size={36} />,
      title: "24/7 Availability",
      desc: "Access your health dashboard, reports, and insights anytime — anywhere in the world.",
      color: "emerald",
      bgLight: "bg-emerald-100",
      textColor: "text-emerald-600",
      border: "border-emerald-400",
      gradient: "from-emerald-600 to-emerald-700",
    },
    {
      icon: <Award size={36} />,
      title: "Certified Experts",
      desc: "We connect you with verified healthcare professionals and trusted wellness partners.",
      color: "orange",
      bgLight: "bg-orange-100",
      textColor: "text-orange-600",
      border: "border-orange-400",
      gradient: "from-orange-600 to-amber-700",
    },
  ];

  return (
    <section
      id="why-choose"
      className="py-16 rounded-3xl shadow-2xl p-8 mb-16 
                 relative overflow-hidden max-w-screen-2xl mx-auto bg-teal-100"
    >
      <div className="relative z-10">
        {/* Heading */}
        <h3 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
          Why <span className="text-teal-700 text-shadow-md">Choose Us</span> ?
        </h3>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`card rounded-3xl p-8 shadow-md flex flex-col items-center text-center 
                          bg-gray-50 ${feature.border} border text-gray-900 
                          transition transform hover:scale-105 hover:shadow-xl`}
            >
              <div
                className={`w-16 h-16 ${feature.bgLight} rounded-full flex items-center justify-center 
                            mb-4 text-3xl ${feature.textColor}`}
              >
                {feature.icon}
              </div>
              <h4 className="text-2xl font-semibold mb-2">{feature.title}</h4>
              <p className="text-gray-600">{feature.desc}</p>

              
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 px-6 py-3 text-lg font-semibold text-white 
                       bg-emerald-700 rounded-full shadow-md 
                       hover:scale-105 hover:shadow-xl transition"
          >
            Explore More <FaArrowRight className="text-white text-lg" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
