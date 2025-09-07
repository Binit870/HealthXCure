import React from "react";

const Help = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-6 text-teal-600">
        Help & Support
      </h1>
       <p className="text-white text-lg text-center mb-10">
        Need assistance? We’re here to help you make the most of HealthCure.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="p-6 rounded-2xl shadow-lg bg-white hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold mb-4 text-teal-500">📞 Contact Support</h2>
          <p className="text-gray-600">
            Reach out to our 24/7 support team for technical issues, 
            appointment help, or general queries.
          </p>
        </div>

        <div className="p-6 rounded-2xl shadow-lg bg-white hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold mb-4 text-teal-500">📚 User Guides</h2>
          <p className="text-gray-600">
            Explore tutorials and step-by-step guides on booking appointments, 
            tracking health, and managing your profile.
          </p>
        </div>

        <div className="p-6 rounded-2xl shadow-lg bg-white hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold mb-4 text-teal-500">💡 FAQs</h2>
          <p className="text-gray-600">
            Find answers to the most common questions about using HealthCure.
          </p>
        </div>

        <div className="p-6 rounded-2xl shadow-lg bg-white hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold mb-4 text-teal-500">🛠 Technical Help</h2>
          <p className="text-gray-600">
            Facing issues? Report bugs or glitches and our tech team will fix them quickly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Help;
