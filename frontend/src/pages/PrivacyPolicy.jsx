import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-teal-600 mb-6">
        Privacy Policy
      </h1>
      <p className="text-gray-700 leading-relaxed mb-6">
        At HealthCure, we prioritize your privacy. This policy outlines how we collect, use, and safeguard your personal information.
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
        <p className="text-gray-600">
          We collect personal data such as your name, email, phone number, and health details when you use our services.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. How We Use Data</h2>
        <p className="text-gray-600">
          Your data is used for booking appointments, improving user experience, and providing personalized health recommendations.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. Data Protection</h2>
        <p className="text-gray-600">
          We use encryption and secure servers to protect your information against unauthorized access or misuse.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
