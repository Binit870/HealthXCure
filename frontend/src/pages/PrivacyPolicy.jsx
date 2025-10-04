import React from "react";
import { ShieldCheck } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-cyan-800 to-cyan-950 text-gray-200 px-6 py-12">
      <div className="flex items-center justify-center gap-3 mb-10">
        <ShieldCheck className="w-10 h-10 text-green-400" />
        <h1 className="text-5xl font-extrabold text-center bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent tracking-tight">
          Privacy Policy
        </h1>
      </div>

      <p className="text-lg md:text-xl leading-relaxed text-center mb-12 max-w-3xl mx-auto text-gray-300 font-medium">
        At <span className="font-semibold text-green-400">HealthCure</span>, we
        value your privacy and are committed to protecting your personal
        information. This policy explains how we collect, use, and safeguard
        your data.
      </p>

      <div className="max-w-4xl mx-auto space-y-8">
        {[
          {
            title: "1. Information We Collect",
            text: "We collect details such as your name, email, phone number, and health records when you register or use our services.",
          },
          {
            title: "2. How We Use Data",
            text: "Your data is used to provide healthcare services, book appointments, improve user experience, and send important updates.",
          },
          {
            title: "3. Data Protection",
            text: "We implement advanced encryption, firewalls, and secure servers to safeguard your personal and medical data.",
          },
          {
            title: "4. Sharing of Information",
            text: "We do not sell your personal data. Information may only be shared with trusted healthcare partners with your consent.",
          },
          {
            title: "5. User Rights",
            text: "You can request access, modification, or deletion of your data at any time by contacting our support team.",
          },
          {
            title: "6. Policy Updates",
            text: "This privacy policy may be updated periodically to reflect changes in regulations or services. We encourage you to review it regularly.",
          },
        ].map((sec, i) => (
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

            <h2 className="text-2xl font-semibold text-cyan-400 mb-3">{sec.title}</h2>
            <p className="text-gray-300 leading-relaxed">{sec.text}</p>
          </section>
        ))}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
