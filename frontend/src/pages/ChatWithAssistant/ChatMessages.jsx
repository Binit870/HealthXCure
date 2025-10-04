import React from "react";
import { motion } from "framer-motion";
import { FaVolumeUp, FaRegStopCircle } from "react-icons/fa";

const ChatMessages = ({ messages, speakingText, setSpeakingText }) => {
  const speakMessage = (text) => {
    if (!("speechSynthesis" in window)) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => setSpeakingText(text);
    utterance.onend = () => setSpeakingText(null);
    utterance.onerror = () => setSpeakingText(null);
    window.speechSynthesis.speak(utterance);
  };

  const handleSpeakerClick = (text) => {
    if (speakingText === text) {
      window.speechSynthesis.cancel();
      setSpeakingText(null);
    } else {
      window.speechSynthesis.cancel();
      speakMessage(text);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
      {messages.map((msg, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`p-3 rounded-lg max-w-lg break-words flex items-center ${
            msg.sender === "user"
              ? "bg-blue-500 text-white self-end ml-auto"
              : "bg-gray-200 text-black self-start mr-auto"
          }`}
        >
          <span className="flex-1">{msg.text}</span>
          {msg.sender === "bot" && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSpeakerClick(msg.text)}
              className="ml-2 p-1 rounded-full text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              {speakingText === msg.text ? <FaRegStopCircle className="text-red-500" /> : <FaVolumeUp />}
            </motion.button>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default ChatMessages;
