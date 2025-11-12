import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaInstagram,
  FaLinkedin,
  FaFacebook,
} from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { SiX } from "react-icons/si";
const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mldwovbn", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        toast.success("✅ Message sent successfully!", { position: "top-right" });
        form.reset();
      } else {
        toast.error("❌ Something went wrong. Please try again.", {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("⚠️ Error: Unable to send message.", { position: "top-right" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 to-teal-300 p-6"
    >
      <div className="flex flex-col lg:flex-row w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
        {/* Left: Contact Info Card */}
        <div className="lg:w-1/2 w-full bg-gradient-to-br from-teal-700 to-teal-600 text-white p-10 flex flex-col justify-between">
         <div>
  <h3 className="text-6xl font-extrabold mb-10 text-center text-white tracking-wide">
    Contact Info
  </h3>

  <div className="space-y-10 text-xl">
    {/* Address */}
    <div className="flex items-start gap-6">
      <FaMapMarkerAlt className="text-teal-200 text-5xl mt-2" />
      <div>
        <p className="font-semibold text-3xl text-white">Our Office</p>
        <p className="text-teal-100 text-2xl leading-relaxed">
          164, Near Brilliant Academy
          <br /> Haludbani, Namotola
          <br /> Jamshedpur, Jharkhand 831002
        </p>
      </div>
    </div>

    {/* Phone */}
    <div className="flex items-start gap-6">
      <FaPhoneAlt className="text-teal-200 text-4xl mt-2" />
      <div>
        <p className="font-semibold text-3xl text-white">Phone</p>
        <p className="text-teal-100 text-2xl">+91 87098 08570</p>
      </div>
    </div>

    {/* Email */}
    <div className="flex items-start gap-6">
      <FaEnvelope className="text-teal-200 text-4xl mt-2" />
      <div>
        <p className="font-semibold text-3xl text-white">Email</p>
        <p className="text-teal-100 text-2xl">healthcure775@gmail.com</p>
      </div>
    </div>

    {/* Support Hours */}
    <div className="flex items-start gap-6">
      <FaClock className="text-teal-200 text-4xl mt-2" />
      <div>
        <p className="font-semibold text-3xl text-white">Support Hours</p>
        <p className="text-teal-100 text-2xl">Mon - Sat: 9 AM - 6 PM</p>
      </div>
    </div>
  </div>
</div>


          {/* Social Media Icons */}
          <div className="flex justify-center gap-6 mt-10 text-5xl">
            <a
                          href="https://www.facebook.com/profile.php?id=61581851285563"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-500 transition-transform transform hover:scale-110"
                        >
                          <FaFacebook />
                        </a>
                        <a
                          href="https://www.instagram.com/healthcure775/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-pink-500 transition-transform transform hover:scale-110"
                        >
                          <FaInstagram />
                        </a>
                        <a
                          href="https://www.linkedin.com/in/healthcure-jamshedpur-2994a8389/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-700 transition-transform transform hover:scale-110"
                        >
                          <FaLinkedin />
                        </a>
                        <a
                          href="https://x.com/HealthCure59238"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-black transition-transform transform hover:scale-110"
                        >
                          <SiX  />
                        </a>
          </div>
        </div>

        {/* Right: Contact Form Card */}
        <div className="lg:w-1/2 w-full bg-white p-10 flex flex-col justify-center">
          <h3 className="text-4xl font-extrabold text-teal-700 text-center mb-8">
            Get in Touch
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-teal-800 font-semibold mb-2"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-4 rounded-xl border border-gray-300 bg-gray-50 text-gray-800 
                  focus:outline-none focus:ring-2 focus:ring-teal-400 transition hover:border-teal-400"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-teal-800 font-semibold mb-2"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-4 rounded-xl border border-gray-300 bg-gray-50 text-gray-800 
                  focus:outline-none focus:ring-2 focus:ring-teal-400 transition hover:border-teal-400"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Subject Input */}
            <div>
              <label
                htmlFor="subject"
                className="block text-teal-800 font-semibold mb-2"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full p-4 rounded-xl border border-gray-300 bg-gray-50 text-gray-800 
                  focus:outline-none focus:ring-2 focus:ring-teal-400 transition hover:border-teal-400"
                placeholder="Enter the subject"
                required
              />
            </div>

            {/* Message Input */}
            <div>
              <label
                htmlFor="message"
                className="block text-teal-800 font-semibold mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                className="w-full p-4 rounded-xl border border-gray-300 bg-gray-50 text-gray-800 
                  focus:outline-none focus:ring-2 focus:ring-teal-400 transition hover:border-teal-400"
                placeholder="Type your message here..."
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-teal-600 text-white font-bold py-4 rounded-xl shadow-lg 
                hover:bg-teal-800 hover:shadow-2xl transition 
                ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>

      <ToastContainer />
    </section>
  );
};

export default ContactSection;
