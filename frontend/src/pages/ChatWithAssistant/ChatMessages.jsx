import React from "react";
import { FaVolumeUp, FaRegStopCircle, FaRobot, FaTrashAlt } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import API from "../../utils/Api";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChatMessages = ({ messages, setMessages, speakingText, setSpeakingText }) => {
  const { user } = useAuth();

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

  const handleDeleteMessage = async (msg) => {
    try {
      if (msg._id) {
        await API.delete(`/ai/chat/message/${user._id}/${msg._id}`);
      }

      const updatedMessages = messages.filter(
        (m) => m._id !== msg._id && m.text !== msg.text
      );

      if (updatedMessages.length === 0) {
        setMessages([{ sender: "bot", text: "Hi! I’m Cura, how can I help you?" }]);
      } else {
        setMessages(updatedMessages);
      }

      toast.success("Message deleted successfully!");
    } catch (err) {
      console.error("Error deleting message:", err);
      toast.error("Failed to delete message.");
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-2 sm:py-4 space-y-3 sm:space-y-4 flex flex-col">
      {messages.map((msg, idx) => (
        <div
          key={msg._id || idx}
          className={`group flex items-center gap-2 sm:gap-3 max-w-full sm:max-w-2xl ${
            msg.sender === "user" ? "self-end text-right flex-row-reverse" : "self-start text-left"
          }`}
        >
          {/* 🗑 Delete Icon */}
          <button
            onClick={() => handleDeleteMessage(msg)}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-500 hover:text-red-600 text-sm sm:text-base flex-shrink-0"
            title="Delete Message"
          >
            <FaTrashAlt />
          </button>

          {/* 🤖 Bot Icon */}
          {msg.sender === "bot" && (
            <FaRobot className="text-lg sm:text-2xl text-teal-600 flex-shrink-0 self-center" />
          )}

          {/* 💬 Message Bubble */}
          <div
            className={`p-2 sm:p-3 rounded-2xl shadow-md break-words w-fit max-w-[85%] sm:max-w-[70%] flex items-center ${
              msg.sender === "user"
                ? "bg-green-300 text-black border border-green-800 justify-end"
                : "bg-teal-200 text-gray-900 border border-teal-500 justify-start"
            }`}
          >
            {msg.sender === "bot" ? (
              <div className="prose prose-sm sm:prose-base max-w-none text-gray-900">
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    components={{
      strong: ({ children }) => (
        <strong className="text-blue-600 font-semibold">{children}</strong>
      ),
      a: ({ href, children }) => (
        <a href={href} className="text-blue-500 underline hover:text-blue-700" target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ),
      ul: ({ children }) => (
        <ul className="list-disc list-inside my-2 space-y-1">{children}</ul>
      ),
      li: ({ children }) => <li className="leading-relaxed">{children}</li>,
      p: ({ children }) => <p className="mb-2 leading-relaxed">{children}</p>,
    }}
  >
    {msg.text}
  </ReactMarkdown>
</div>

            ) : (
              <span>{msg.text}</span>
            )}
          </div>

          {/* 🔊 Speaker Icon */}
          <button
            onClick={() => handleSpeakerClick(msg.text)}
            className="p-1 sm:p-2 rounded-full bg-white/80 text-gray-600 hover:bg-gray-200 transition-colors duration-200 flex-shrink-0 self-center"
            title={speakingText === msg.text ? "Stop" : "Speak"}
          >
            {speakingText === msg.text ? (
              <FaRegStopCircle className="text-red-400 text-base sm:text-lg" />
            ) : (
              <FaVolumeUp className="text-base sm:text-lg" />
            )}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
