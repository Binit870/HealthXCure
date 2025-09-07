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
        alert("❌ Oops! Something went wrong.");
      }
    } catch (error) {
      alert("❌ Error: Unable to send message.");
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-slate-900 to-blue-800 p-6 relative"
    >
      {/* Centered form */}
      <div className="w-full max-w-xl">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/10 text-center hover:shadow-3xl hover:scale-[1.01] transition-transform duration-300">
          <h3 className="text-4xl font-extrabold text-white text-center mb-10">
            Get in Touch with Us
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-white font-semibold mb-2 text-left">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-4 rounded-xl border border-white/20 bg-slate-800/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-white font-semibold mb-2 text-left">
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
            <div>
              <label htmlFor="message" className="block text-white font-semibold mb-2 text-left">
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
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold py-4 rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-600 transition duration-300 transform hover:scale-105"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Success Message */}
      {isSubmitted && (
        <div className="absolute bottom-10 bg-green-500/20 border border-green-400 text-green-300 px-6 py-4 rounded-2xl shadow-xl animate-slide-in">
          <h4 className="text-lg font-bold">✅ Your message was sent successfully!</h4>
          <p>We will get back to you soon.</p>
        </div>
      )}
    </section>
  );
};

export default ContactSection;
