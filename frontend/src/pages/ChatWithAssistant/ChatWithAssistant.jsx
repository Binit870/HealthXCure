import React, { useState, useRef, useEffect } from "react";
import { FaUserMd, FaArrowLeft } from "react-icons/fa";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import API from "../../utils/Api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChatWithAssistant = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [speakingText, setSpeakingText] = useState(null);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // ✅ Fetch chat history on mount
  useEffect(() => {
    const fetchHistory = async () => {
      if (!user?._id) return;

      try {
        const res = await API.get(`/ai/chat/history/${user._id}`);
        if (Array.isArray(res.data.messages) && res.data.messages.length > 0) {
          setMessages(res.data.messages);
        } else {
          setMessages([{ sender: "bot", text: "Hi! I’m Cura, how can I help you?" }]);
        }
      } catch (err) {
        console.error("Error fetching chat history:", err);
        toast.error("Failed to load chat history. Showing default message.");
        setMessages([{ sender: "bot", text: "Hi! I’m Cura, how can I help you?" }]);
      } finally {
        setLoadingHistory(false);
      }
    };

    if (user && user._id) {
      fetchHistory();
    }
  }, [user]);

  // ✅ Auto-scroll when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Cleanup speech recognition + synthesis
  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
      window.speechSynthesis.cancel();
    };
  }, []);

  // ✅ Send message to backend
  const handleSend = async (msg = input) => {
    if (!msg.trim()) return;
    const newMsg = { sender: "user", text: msg };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    try {
      const res = await API.post("/ai/chat", { message: msg, userId: user?._id });
      const botMsg = { sender: "bot", text: res.data.reply || "No response." };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      toast.error("Something went wrong while sending your message.");
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, something went wrong." },
      ]);
    }
  };

  const handleGoBack = () => navigate("/");

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-teal-50 to-teal-100">
      {/* ✅ Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      {/* ✅ Header */}
      <header className="fixed top-0 w-full z-20 bg-teal-200 border-b border-gray-300 shadow-md">
  <div className="relative flex items-center justify-center py-4 px-4 sm:px-6">
    
    {/* 🔙 Back button (absolute on left) */}
    <button
      onClick={handleGoBack}
      className="absolute left-4 sm:left-6 flex items-center text-teal-700 hover:text-teal-900 transition duration-200"
      title="Go Back to Home"
    >
      <FaArrowLeft className="text-lg sm:text-xl" />
    </button>

    {/* 🩺 Centered Icon + Title */}
    <div className="flex items-center gap-2 sm:gap-3 text-center">
      <FaUserMd className="text-lg sm:text-2xl text-teal-800" />
      <h1 className="text-base sm:text-xl md:text-2xl font-extrabold text-teal-800">
        Cura: Your Personal Health Chatbot
      </h1>
    </div>

  </div>
</header>




      {/* ✅ Chat Section */}
      <main className="flex flex-col flex-1 pt-16 sm:pt-20 w-full relative overflow-hidden">
        <div
          className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4"
          style={{ scrollBehavior: "smooth" }}
        >
          {loadingHistory ? (
            <div className="text-center text-gray-500 mt-8 text-sm sm:text-base">
              Loading chat history...
            </div>
          ) : (
            <>
              <ChatMessages
                messages={messages}
                setMessages={setMessages}
                speakingText={speakingText}
                setSpeakingText={setSpeakingText}
              />
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* ✅ Chat Input */}
        <div className="w-full">
          <ChatInput
            input={input}
            setInput={setInput}
            handleSend={handleSend}
            isListening={isListening}
            setIsListening={setIsListening}
            recognitionRef={recognitionRef}
            setMessages={setMessages}
          />
        </div>
      </main>
    </div>
  );
};

export default ChatWithAssistant;