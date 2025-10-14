import React from "react";
import { motion } from "framer-motion";
import { FaVolumeUp, FaRegStopCircle } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
          className={`flex items-center max-w-lg ${
            msg.sender === "user"
              ? "self-end ml-auto justify-end"
              : "self-start mr-auto justify-start"
          }`}
        >
          <div
            className={`p-3 rounded-2xl shadow-md ${
              msg.sender === "user"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-900 border border-gray-200"
            }`}
          >
            {msg.sender === "bot" ? (
              <div className="max-w-md bg-white rounded-xl shadow-sm p-4 text-sm text-gray-800 leading-relaxed">
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    components={{
      strong: ({ children }) => <strong className="text-blue-600 font-semibold">{children}</strong>,
      ul: ({ children }) => <ul className="list-disc list-inside space-y-1">{children}</ul>,
      li: ({ children }) => <li>{children}</li>,
      p: ({ children }) => <p className="mb-2">{children}</p>,
    }}
  >
    {msg.text}
  </ReactMarkdown>
</div>



            ) : (
              <span>{msg.text}</span>
            )}
          </div>

          {msg.sender === "bot" && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSpeakerClick(msg.text)}
              className="ml-2 flex-shrink-0 p-2 rounded-full bg-white/80 text-gray-600 hover:bg-gray-200 transition-colors duration-200"
            >
              {speakingText === msg.text ? (
                <FaRegStopCircle className="text-red-500" />
              ) : (
                <FaVolumeUp />
              )}
            </motion.button>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default ChatMessages;
