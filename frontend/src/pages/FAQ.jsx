import React from "react";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "1. How do I find a doctor?",
    answer:
      "Use the 'Find a Doctor' feature in the app to search by specialty, location, or availability. You can view profiles, ratings, and schedule appointments directly.",
  },
  {
    question: "2. How can I check my medical reports?",
    answer:
      "Access the 'Reports' section from your dashboard to view all uploaded or lab-generated medical reports. You can download or share them securely with your healthcare provider.",
  },
  {
    question: "3. What is the community feature?",
    answer:
      "The community feature connects you with other users for discussions, support, and knowledge sharing. Participate in health forums, join groups, and engage with certified professionals.",
  },
  {
    question: "4. How can I get a personalized diet plan?",
    answer:
      "Navigate to the 'Diet Plan' section and complete your health and lifestyle profile. Our system generates a diet plan tailored to your goals, preferences, and medical requirements.",
  },
  {
    question: "5. Is my medical data secure?",
    answer:
      "Yes, we use advanced encryption and comply with healthcare data security standards to protect your personal and medical information at all times.",
  },
  {
    question: "6. Does HealthCure provide emergency services?",
    answer:
      "Currently, we do not handle emergencies. Please contact local emergency numbers for urgent cases.",
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-cyan-800 to-cyan-950 text-gray-200 px-6 py-12">
      {/* Heading with Icon */}
      <div className="flex items-center justify-center gap-3 mb-14">
        <HelpCircle className="w-10 h-10 text-teal-400" />
        <h1
          className="text-5xl md:text-6xl font-extrabold text-center 
                     bg-gradient-to-r from-cyan-400 via-teal-400 to-green-400 
                     bg-clip-text text-transparent tracking-tight"
        >
          Frequently Asked Questions
        </h1>
      </div>

      {/* Card Container */}
      <div className="max-w-4xl mx-auto space-y-8">
        {faqs.map((faq, index) => (
          <section
            key={index}
            className="relative p-6 bg-gray-800 rounded-2xl border border-gray-700 
                       shadow-lg shadow-cyan-600 transition-transform transform 
                       hover:-translate-y-1 hover:shadow-cyan-400 overflow-hidden"
          >
            {/* Glow */}
            <div className="absolute inset-0 rounded-2xl 
                            bg-gradient-to-r from-cyan-400 to-teal-400 
                            opacity-0 hover:opacity-20 blur-xl transition duration-500 pointer-events-none"></div>

            <h2 className="text-2xl font-semibold text-cyan-300 mb-3">
              {faq.question}
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">{faq.answer}</p>
          </section>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
