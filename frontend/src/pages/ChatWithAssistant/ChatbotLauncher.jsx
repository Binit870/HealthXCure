import React, { useRef, useState } from "react";
import Draggable from "react-draggable";
import chatbotIcon from "../../assets/health-chatbot-icon.png";
import { useNavigate } from "react-router-dom";
import API from "../../utils/Api";
import { ToastContainer, toast } from "react-toastify";
import { FaPaperPlane, FaRobot } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const ChatbotLauncher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const nodeRef = useRef(null);
  const navigate = useNavigate();

  // Helper to clean and format AI replies
  const formatAIResponse = (reply) => {
    if (!reply) return "Sorry, I couldn’t process that right now.";

    let aiReply = reply
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .trim();

    // Add "Suggested Doctor:" prefix if missing
    if (
      /^(general|dermatologist|pediatrician|cardiologist|neurologist|orthopedic|gynecologist|psychologist)/i.test(
        aiReply
      ) &&
      !aiReply.toLowerCase().startsWith("suggested doctor")
    ) {
      aiReply = `Suggested Doctor: ${aiReply.charAt(0).toUpperCase()}${aiReply.slice(
        1
      )}`;
    }

    return aiReply;
  };

  // Function to send message
  const sendMessage = async () => {
    if (!input.trim()) {
      toast.warning("Please type a message first!");
      return;
    }

    const newMessage = { sender: "user", text: input.trim() };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await API.post("/ai/chat", { message: input });
      const aiReply = formatAIResponse(response.data.reply);
      setMessages((prev) => [...prev, { sender: "bot", text: aiReply }]);
    } catch (error) {
      console.error("AI backend error:", error);
      toast.error("Error connecting to the AI server!");
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Unable to reach the AI service." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key to send
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Reset chat on close
  const handleClose = () => {
    setIsOpen(false);
    setMessages([]); // clear chat on close
  };

  return (
    <>
      <Draggable nodeRef={nodeRef} bounds="body">
        <div
          ref={nodeRef}
          className="fixed bottom-6 right-6 z-[9999]"
          style={{ touchAction: "none" }}
        >
          {/* Floating Chat Icon */}
          {!isOpen && (
            <button
              onClick={() => setIsOpen(true)}
              className="bg-green-50 border border-green-300 shadow-md rounded-full p-3 hover:bg-green-100 transition-all"
              title="Chat with Cura"
            >
              <img
                src={chatbotIcon}
                alt="Cura Chatbot"
                className="w-9 h-9"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(17%) sepia(98%) saturate(748%) hue-rotate(88deg) brightness(90%) contrast(90%)",
                }}
              />
            </button>
          )}

          {/* Chat Popup */}
          {isOpen && (
            <div className="fixed bottom-24 right-6 w-[340px] h-[460px] bg-white border border-green-300 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
              {/* Header */}
              <div className="bg-green-600 text-white p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FaRobot className="text-white text-xl" />
                  <h4 className="font-semibold text-lg">
                    Cura - Your Health Assistant
                  </h4>
                </div>
                <button
                  onClick={handleClose}
                  className="text-white text-xl font-bold hover:text-gray-200"
                >
                  ×
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-green-50 to-white">
                {messages.length === 0 && (
                  <p className="text-teal-900 text-sm text-center mt-10">
                    Start chatting with Cura about your health!
                  </p>
                )}

                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`px-4 py-2 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.sender === "user"
                        ? "bg-green-100 border border-green-300 text-right ml-auto rounded-br-none"
                        : "bg-teal-100  border border-teal-300 text-left mr-auto rounded-bl-none"
                    }`}
                    style={{
                      width: "fit-content",
                      maxWidth: "80%",
                      wordBreak: "break-word",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {msg.sender === "bot" ? (
                      <div className="text-gray-800 space-y-1">
                        {msg.text.split("\n").map((line, i) => {
                          if (/^[-•]/.test(line.trim())) {
                            return (
                              <div key={i} className="flex items-start gap-1">
                                <span className="text-green-600 mt-[2px]">•</span>
                                <span>{line.replace(/^[-•]\s*/, "")}</span>
                              </div>
                            );
                          } else if (line.match(/https?:\/\/[^\s]+/)) {
                            const parts = line.split(/(https?:\/\/[^\s]+)/g);
                            return (
                              <p key={i}>
                                {parts.map((part, j) =>
                                  part.match(/https?:\/\/[^\s]+/) ? (
                                    <a
                                      key={j}
                                      href={part}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-green-700 underline hover:text-green-900"
                                    >
                                      {part}
                                    </a>
                                  ) : (
                                    part
                                  )
                                )}
                              </p>
                            );
                          } else {
                            return <p key={i}>{line}</p>;
                          }
                        })}
                      </div>
                    ) : (
                      <span className="text-gray-800">{msg.text}</span>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <p className="text-teal-500 text-sm italic text-left">
                    Cura is thinking...
                  </p>
                )}
              </div>

              {/* Input Bar */}
              <div className="p-3 flex items-center justify-between border-t bg-white">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  className="border border-gray-300 rounded-full px-3 py-2 text-sm w-[78%] focus:outline-none focus:ring-1 focus:ring-green-400"
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading}
                  className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 disabled:opacity-50 transition-transform hover:scale-105"
                >
                  <FaPaperPlane className="text-lg" />
                </button>
              </div>

              {/* Open Full Chat */}
              <button
                onClick={() => navigate("/chat")}
                className="text-center w-full py-2 bg-gray-100 text-green-700 font-semibold border-t hover:bg-gray-200"
              >
                Open Full Chat
              </button>
            </div>
          )}
        </div>
      </Draggable>

      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
};

export default ChatbotLauncher;
