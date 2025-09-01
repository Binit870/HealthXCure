import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-teal-600 mb-6">
        Terms & Conditions
      </h1>
      <p className="text-gray-700 leading-relaxed mb-6">
        By using HealthCure, you agree to the following terms and conditions.
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. Acceptance of Terms</h2>
        <p className="text-gray-600">
          Accessing HealthCure services signifies your agreement to abide by these terms.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. User Responsibilities</h2>
        <p className="text-gray-600">
          Users must provide accurate information and comply with all applicable laws when using our platform.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. Limitations of Liability</h2>
        <p className="text-gray-600">
          HealthCure is not liable for indirect damages or misuse of the platform by users.
        </p>
      </section>
    </div>
  );
};

export default TermsAndConditions;
