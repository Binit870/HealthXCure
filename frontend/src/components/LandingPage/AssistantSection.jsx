import React from "react";
import { Link } from "react-router-dom";
import {  FaHeartbeat,
  FaPaperPlane } from "react-icons/fa";

const AssistantSection = () => (
  <section
            id="assistant"
            className="py-12 rounded-3xl shadow-lg mb-16 p-8 md:p-12 text-center fade-in-on-scroll bg-white/10 backdrop-blur-xl border border-white/10"
          >
            <h3 className="text-4xl font-extrabold text-white mb-6">Your Personal Health Assistant</h3>
            <p className="text-gray-200 max-w-2xl mx-auto mb-8">
              Chat with our AI-powered assistant for instant answers to your health-related questions.
            </p>
  
            <div className="rounded-3xl shadow-xl border border-white/10 overflow-hidden bg-slate-900/40">
              {/* Preview Chat Window */}
              <div className="h-96 p-6 overflow-y-auto space-y-4">
                <div className="flex justify-start">
                  <div className="chat-message received max-w-md p-4 rounded-3xl bg-gray-200 text-black">
                    Hi there! How can I help you with your health today?
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="chat-message sent max-w-md p-4 rounded-3xl bg-blue-600 text-white">
                    What are the symptoms of the flu?
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="chat-message received max-w-md p-4 rounded-3xl bg-gray-200 text-black">
                    Common flu symptoms include fever, body aches, sore throat, and a cough.
                  </div>
                </div>
              </div>
  
              {/* Redirect to Full Chat Page */}
              <div className="p-4 border-t border-white/10 flex space-x-2 bg-slate-900/30">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-grow p-3 rounded-full border border-white/10 bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  onFocus={() => (window.location.href = "/chat")}
                />
  
                <a
                  href="/chat"
                  className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-blue-700 transition duration-300"
                >
                  <i className="fas fa-paper-plane"><FaPaperPlane /></i>
                </a>
  
              </div>
            </div>
          </section>
);

export default AssistantSection;
