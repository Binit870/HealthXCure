import React from "react";
import { FileCheck } from "lucide-react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-cyan-800 to-cyan-950 text-gray-200 px-6 py-12">
      {/* Heading with Icon */}
      <div className="flex items-center justify-center gap-3 mb-10">
        <FileCheck className="w-10 h-10 text-teal-400" />
        <h1 className="text-5xl font-extrabold text-center 
                       bg-gradient-to-r from-cyan-400 via-teal-400 to-green-400 
                       bg-clip-text text-transparent tracking-tight">
          Terms & Conditions
        </h1>
      </div>

      {/* Subtitle */}
      <p className="text-lg md:text-xl leading-relaxed text-center mb-12 max-w-3xl mx-auto text-gray-300 font-medium">
        By using <span className="font-semibold text-teal-400">HealthCure</span>, you agree to the following terms and conditions.
      </p>

      {/* Card Container */}
      <div className="max-w-4xl mx-auto space-y-8">
        {[
          {
            title: "1. Acceptance of Terms",
            text: "Accessing HealthCure services signifies your agreement to abide by these terms.",
          },
          {
            title: "2. User Responsibilities",
            text: "Users must provide accurate information and comply with all applicable laws when using our platform.",
          },
          {
            title: "3. Limitations of Liability",
            text: "HealthCure is not liable for indirect damages or misuse of the platform by users.",
          },
          {
            title: "4. Intellectual Property",
            text: "All content, logos, and materials on the platform are owned by HealthCure and may not be used without permission.",
          },
          {
            title: "5. Termination",
            text: "HealthCure reserves the right to suspend or terminate user accounts for violations of these terms.",
          },
          {
            title: "6. Governing Law",
            text: "These terms are governed by the laws of the jurisdiction in which HealthCure operates, without regard to conflict of law principles.",
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

            <h2 className="text-2xl font-semibold text-cyan-300 mb-3">{sec.title}</h2>
            <p className="text-gray-300 leading-relaxed">{sec.text}</p>
          </section>
        ))}
      </div>
    </div>
  );
};

export default TermsAndConditions;
