import React, { useState } from "react";

const faqs = [
  {
    question: "How do I book a doctor appointment?",
    answer:
      "Go to the Appointments section, select your preferred doctor, and choose a time slot."
  },
  {
    question: "Is my medical data secure?",
    answer:
      "Yes, we use advanced encryption and comply with healthcare data security standards."
  },
  {
    question: "Can I cancel or reschedule appointments?",
    answer:
      "Yes, you can manage appointments from your dashboard under 'My Appointments'."
  },
  {
    question: "Does HealthCure provide emergency services?",
    answer:
      "Currently, we do not handle emergencies. Please contact local emergency numbers for urgent cases."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-teal-600 mb-10">
        Frequently Asked Questions
      </h1>

      {faqs.map((faq, index) => (
        <div
          key={index}
          className="mb-4 border-b border-gray-200 pb-4 cursor-pointer"
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        >
          <h2 className="text-lg font-semibold flex justify-between items-center">
            {faq.question}
            <span>{openIndex === index ? "−" : "+"}</span>
          </h2>
          {openIndex === index && (
            <p className="text-gray-600 mt-2">{faq.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
