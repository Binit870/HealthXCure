import React, { useState } from "react";

const ContactSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    try {
      // Uncomment below when deploying live
      /*
      const response = await fetch("https://formspree.io/f/mldwovbn", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        alert("❌ Oops! Something went wrong. Please try again.");
        return;
      }
      */

      // For localhost testing, we mock success
      setIsSubmitted(true);

    } catch (error) {
      alert("❌ Error: Unable to send message.");
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-slate-900 to-blue-800 p-6"
    >
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/10">
        <h3 className="text-4xl font-extrabold text-white text-center mb-10">
          Get in Touch with Us
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name field with inline success message */}
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="name"
              className="text-white font-semibold"
            >
              Your Name
            </label>

            {isSubmitted && (
              <span className="text-green-400 font-bold ml-4 whitespace-nowrap">
                ✅ Your message was sent successfully!
              </span>
            )}
          </div>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-4 rounded-xl border border-white/20 bg-slate-800/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter your name"
            required
          />

          {/* Email field */}
          <div>
            <label
              htmlFor="email"
              className="block text-white font-semibold mb-2"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-4 rounded-xl border border-white/20 bg-slate-800/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Message field */}
          <div>
            <label
              htmlFor="message"
              className="block text-white font-semibold mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              className="w-full p-4 rounded-xl border border-white/20 bg-slate-800/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Type your message here..."
              required
            ></textarea>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold py-4 rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-600 transition duration-300 transform hover:scale-105"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
