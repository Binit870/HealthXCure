import React from "react";
import { FileCheck } from "lucide-react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-16">
      {/* Heading with Icon */}
      <div className="flex items-center justify-center gap-3 mb-14">
        <FileCheck className="w-10 h-10 text-teal-500" />
        <h1
          className="text-4xl md:text-5xl font-extrabold text-center 
                     bg-gradient-to-r from-teal-500 to-cyan-600 
                     bg-clip-text text-transparent tracking-tight"
        >
          Terms & Conditions
        </h1>
      </div>

      {/* Subtitle */}
      <p className="text-lg md:text-xl leading-relaxed text-center mb-12 max-w-3xl mx-auto text-gray-600 font-medium">
        By using <span className="font-semibold text-teal-600">HealthCure</span>,
        you agree to the following terms and conditions.
      </p>

      {/* Card Container */}
     <div className="max-w-4xl mx-auto space-y-8">
  {[
    {
      title: "1. Acceptance of Terms",
      text: "By using our platform, you agree to comply with these Terms and Conditions. You must read them carefully before accessing our services. Continued use means you accept any future changes. If you disagree, please stop using the platform immediately.",
    },
    {
      title: "2. User Responsibilities",
      text: "You agree to provide accurate information while creating your account. You are responsible for maintaining the confidentiality of your login credentials. Any misuse or unauthorized access under your account will be your responsibility. Please report any suspicious activity promptly.",
    },
    {
      title: "3. Service Usage",
      text: "Our platform is intended for personal and lawful use only. You may not use it for fraudulent, harmful, or illegal activities. We reserve the right to suspend access for policy violations. All services are subject to availability and applicable regulations.",
    },
    {
      title: "4. Intellectual Property",
      text: "All content, design, and logos on this platform are our intellectual property. You may not copy, modify, or distribute them without permission. Unauthorized use may lead to legal action. Respect our copyrights and trademarks at all times.",
    },
    {
      title: "5. Limitation of Liability",
      text: "We strive to provide accurate and reliable services but do not guarantee error-free operation. We are not liable for losses arising from delays, technical issues, or third-party actions. Users should verify all information before relying on it. Use of the platform is at your own risk.",
    },
    {
      title: "6. Third-Party Links",
      text: "Our app may include links to third-party sites for your convenience. We are not responsible for the content or privacy practices of those sites. Accessing external links is at your discretion. We recommend reviewing their policies before sharing any information.",
    },
    {
      title: "7. Termination of Access",
      text: "We may suspend or terminate your access without prior notice if you violate these terms. Termination does not affect any legal rights or obligations. You may stop using the platform at any time. All clauses related to privacy and liability will remain effective.",
    },
    {
      title: "8. Updates to Terms",
      text: "We may update these Terms and Conditions as our services evolve. Major changes will be communicated through email or in-app notifications. Please review this section regularly to stay informed. Continued use signifies your acceptance of the updated terms.",
    },
  ].map((sec, i) => (
    <section
      key={i}
      className="relative p-6 bg-gray-50 rounded-2xl border border-gray-200 
                 shadow-sm hover:shadow-md transition duration-200"
    >
      <h2 className="text-2xl font-semibold text-teal-700 mb-3">
        {sec.title}
      </h2>
      <p className="text-gray-700 leading-relaxed">{sec.text}</p>
    </section>
  ))}
</div>
</div>
);
};

export default TermsAndConditions;
