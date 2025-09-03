import React from "react";
import { Link } from "react-router-dom";
import { FaMicroscope, FaCalendarCheck, FaMapMarkerAlt, FaAppleAlt } from "react-icons/fa";

const ContactSection = () => (
  <section id="contact" className="py-12 rounded-3xl shadow-lg p-8 md:p-12 mb-16 fade-in-on-scroll bg-white/10 backdrop-blur-xl border border-white/10">
          <h3 className="text-4xl font-extrabold text-white text-center mb-8">Get in Touch with Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white font-semibold mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-3 rounded-xl border border-white/10 bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-white font-semibold mb-2">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 rounded-xl border border-white/10 bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-white font-semibold mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className="w-full p-3 rounded-xl border border-white/10 bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type your message here..."
                  required
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105">
                Send Message
              </button>
            </form>
            <div className="rounded-xl overflow-hidden shadow-md border border-white/10">
              <img src="https://placehold.co/600x400/E5E7EB/fff?text=Map+Location+Placeholder" alt="Map Location" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>
);

export default ContactSection;
