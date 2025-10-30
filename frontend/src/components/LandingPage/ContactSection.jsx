import React, { useState } from "react";

const ContactSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mldwovbn", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
        setTimeout(() => setIsSubmitted(false), 4000);
      } else {
        alert("❌ Oops! Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("❌ Error: Unable to send message.");
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center bg-white p-6"
    >
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl transition duration-300 p-10 border border-gray-200
          hover:shadow-xl"
      >
        <h3 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
          Get in Touch with Us
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-gray-800 font-semibold mb-2"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-4 rounded-xl border border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-500 
                focus:outline-none focus:ring-2 focus:ring-cyan-400 transition 
                hover:border-cyan-400"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email Input + Success Message inline */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-800 font-semibold mb-2"
            >
              Your Email
            </label>
            <div className="flex items-center gap-3">
              <input
                type="email"
                id="email"
                name="email"
                className="flex-1 p-4 rounded-xl border border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-500 
                  focus:outline-none focus:ring-2 focus:ring-cyan-400 transition 
                  hover:border-cyan-400"
                placeholder="Enter your email"
                required
              />

              {isSubmitted && (
                <span className="bg-green-600 text-white text-sm font-bold px-3 py-2 rounded-lg shadow-md animate-fade-in">
                  ✅ Sent!
                </span>
              )}
            </div>
          </div>

          {/* Message Input */}
          <div>
            <label
              htmlFor="message"
              className="block text-gray-800 font-semibold mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              className="w-full p-4 rounded-xl border border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-500 
                focus:outline-none focus:ring-2 focus:ring-cyan-400 transition 
                hover:border-cyan-400"
              placeholder="Type your message here..."
              required
            ></textarea>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold py-4 rounded-xl shadow-lg 
              hover:from-blue-500 hover:to-blue-400 hover:shadow-2xl"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
