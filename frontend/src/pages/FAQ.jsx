import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

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
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-16">
      {/* Heading */}
      <div className="flex items-center justify-center gap-3 mb-14">
        <HelpCircle className="w-10 h-10 text-teal-500" />
        <h1
          className="text-4xl md:text-5xl font-extrabold text-center 
                     bg-gradient-to-r from-teal-500 to-cyan-600 
                     bg-clip-text text-transparent tracking-tight"
        >
          Frequently Asked Questions
        </h1>
      </div>

      {/* FAQ Container */}
      <div className="max-w-4xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-gray-50 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md 
                       transition duration-200"
          >
            {/* Question Header */}
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-5 text-left"
            >
              <h2 className="text-lg md:text-xl font-semibold text-teal-700">
                {faq.question}
              </h2>
              {openIndex === index ? (
                <ChevronUp className="w-6 h-6 text-teal-600" />
              ) : (
                <ChevronDown className="w-6 h-6 text-teal-600" />
              )}
            </button>

            {/* Answer Section (Dropdown) */}
            <div
              className={`transition-all duration-300 overflow-hidden ${
                openIndex === index ? "max-h-60 p-5 pt-0" : "max-h-0"
              }`}
            >
              <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
