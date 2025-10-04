import React from "react";
import { Link } from "react-router-dom";
import { FaRobot, FaHeartbeat, FaComments } from "react-icons/fa";

const styles = `
  @keyframes pulse-slow {
    0%, 100% {
      transform: scale(1);
      opacity: 0.05;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.15;
    }
  }

  @keyframes pulse-slow-reverse {
    0%, 100% {
      transform: scale(1.1);
      opacity: 0.15;
    }
    50% {
      transform: scale(1);
      opacity: 0.05;
    }
  }
`;

const AssistantSection = () => (
  <>
    <style>{styles}</style>
    <section
      id="assistant"
      className="relative py-12 px-4 sm:px-8 md:px-12 lg:px-16 rounded-3xl shadow-2xl mb-20 text-center fade-in-on-scroll
                 bg-gradient-to-br from-cyan-800 via-cyan-800 to-cyan-700 border-white/10"
    >
      {/* Background SVGs */}
      <div className="absolute inset-0 z-0 opacity-20">
        <svg
          className="absolute top-1/3 left-1/4 text-pink-400 w-36 h-36 transform -translate-x-1/2 -translate-y-1/2 animate-[pulse-slow_6s_ease-in-out_infinite]"
          fill="currentColor"
          viewBox="0 0 512 512"
        >
          <path d="M462.3 62.6C405.6 30.3 331.8 32.5 275 75.6v0C239.3 104.5 210 160.8 210 160.8c-28.5-44.5-56.5-68.8-93.5-84.5C70.3 47.7 20.5 59.3 2.5 96.6s-18.7 101.4 12.5 154.5c41.2 73.1 129.5 174 213.5 251.5c4.7 4.5 10.4 6.8 16.2 6.8s11.5-2.3 16.2-6.8c84-77.5 172.3-178.4 213.5-251.5c31.2-53.1 27.2-117.8-12.5-154.5z"/>
        </svg>
        <svg
          className="absolute bottom-1/4 right-1/4 text-cyan-300 w-32 h-32 transform translate-x-1/2 translate-y-1/2 animate-[pulse-slow-reverse_6s_ease-in-out_infinite]"
          fill="currentColor"
          viewBox="0 0 512 512"
        >
          <path d="M498.1 41.5c-5.5-2.7-11.7-4.1-17.9-4.1s-12.4 1.4-17.9 4.1L256 160L49.7 41.5C44.2 38.8 38 37.4 31.8 37.4s-12.4 1.4-17.9 4.1c-14.7 7.3-23.7 22.8-23.9 39.5c-.2 16.7 8.5 32.2 23.3 39.6L256 312L481.5 120.6c14.8-7.4 23.5-22.9 23.3-39.6c-.2-16.7-9.2-32.2-23.9-39.5zM0 160v120c0 10.5 5.5 20.3 14.7 25.7l221.7 127.6c9.2 5.3 20.3 5.3 29.5 0L497.3 305.7c9.2-5.4 14.7-15.2 14.7-25.7V160L256 288L0 160z"/>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <h3 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200 drop-shadow-2xl">
            <FaRobot className="inline-block mr-2 text-cyan-100" />
            Your Personal Health Assistant
          </h3>
        </div>

        <p className="text-white max-w-2xl mx-auto mb-10 text-lg sm:text-xl">
          <FaHeartbeat className="inline-block mr-2 text-red-300" />
          Get instant, reliable answers to your health questions with our secure, AI-powered assistant.
        </p>

        <div className="rounded-3xl shadow-2xl border border-cyan-300 overflow-hidden bg-cyan-900/40 transition-all duration-300 hover:scale-[1.01]">
          {/* Chat Preview */}
          <div className="h-72 p-6 overflow-y-auto space-y-4">
            <div className="flex justify-start">
              <div className="chat-message received max-w-md p-4 rounded-3xl rounded-bl-md bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg">
                Hi there! How can I help you with your health today?
              </div>
            </div>
            <div className="flex justify-end">
              <div className="chat-message sent max-w-md p-4 rounded-3xl rounded-br-md bg-gray-100 text-gray-900 shadow-lg">
                What are the symptoms of the flu?
              </div>
            </div>
            <div className="flex justify-start">
              <div className="chat-message received max-w-md p-4 rounded-3xl rounded-bl-md bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg">
                Common flu symptoms include fever, body aches, sore throat, and a cough.
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-cyan-400 flex space-x-2 bg-cyan-950/40">
            <input
              type="text"
              placeholder="Type your message to start the chat..."
              className="flex-grow p-4 rounded-full border border-cyan-400 bg-cyan-950 text-white placeholder-cyan-300
                         focus:outline-none focus:ring-2 focus:ring-white cursor-pointer transition-colors duration-300"
              onFocus={() => (window.location.href = "/chat")}
            />
            <Link
              to="/chat"
              className="bg-gradient-to-br from-pink-400 to-cyan-500 text-white rounded-full w-14 h-14 flex items-center justify-center
                         hover:from-pink-500 hover:to-cyan-600 transition duration-300 transform hover:scale-110 shadow-lg"
            >
              <FaComments className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default AssistantSection;
