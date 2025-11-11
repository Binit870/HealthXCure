import React from "react";
import { ShieldCheck } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-16">
      {/* Heading with Icon */}
      <div className="flex items-center justify-center gap-3 mb-14">
        <ShieldCheck className="w-10 h-10 text-teal-500" />
        <h1
          className="text-4xl md:text-5xl font-extrabold text-center 
                     bg-gradient-to-r from-teal-500 to-cyan-600 
                     bg-clip-text text-transparent tracking-tight"
        >
          Privacy Policy
        </h1>
      </div>

      {/* Subtitle */}
      <p className="text-lg md:text-xl leading-relaxed text-center mb-12 max-w-3xl mx-auto text-gray-600 font-medium">
        At <span className="font-semibold text-teal-600">HealthCure</span>, we
        value your privacy and are committed to protecting your personal
        information. This policy explains how we collect, use, and safeguard
        your data.
      </p>

      {/* Card Container */}
     <div className="max-w-4xl mx-auto space-y-8">
  {[
    {
      title: "1. Information We Collect",
      text: "We collect your name, email, phone number, and health details when you register or use our services. We also gather device and usage data to improve performance. Your appointment and report details help ensure better care. All data collected is used only for service-related purposes.",
    },
    {
      title: "2. How We Use Data",
      text: "Your data helps us provide healthcare services and book appointments. We use it to send reminders, updates, and health tips. It also helps us improve our app features and user experience. We use your information strictly within privacy guidelines.",
    },
    {
      title: "3. Data Protection",
      text: "We use strong encryption and secure servers to protect your data. Access is restricted to authorized healthcare professionals only. Regular security checks help us prevent unauthorized access. Your personal and medical information is always kept confidential.",
    },
    {
      title: "4. Sharing of Information",
      text: "We never sell your personal information to anyone. Data may be shared only with trusted healthcare partners. Sharing happens only when necessary for your treatment. We follow strict privacy rules before sharing any details.",
    },
    {
      title: "5. User Rights",
      text: "You can view, update, or delete your data anytime. You can also withdraw consent for data usage if you wish. We’ll process such requests quickly through our support team. Your privacy choices are always respected by our system.",
    },
    {
      title: "6. Policy Updates",
      text: "Our privacy policy may change as we improve our services. Any major updates will be shared through email or app alerts. We encourage you to review the latest version regularly. Continued use means you agree to the updated policy.",
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

export default PrivacyPolicy;
