import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const ChatWithAssistant = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I'm your AI Health Assistant. Ask me anything about health.",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Auto scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ---- TEXT CHAT ----
  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message instantly
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    try {
      const res = await axios.post("http://localhost:5000/api/ai/chat", {
        message: input,
      });

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: res.data.reply || "No response." },
      ]);
    } catch (error) {
      console.error("Chat API error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Sorry, something went wrong." },
      ]);
    }

    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  // ---- FILE UPLOAD (PDFs / Images) ----
  const handleAttachFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Add user message instantly
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: `📎 Uploaded: ${file.name}` },
    ]);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(
        "http://localhost:5000/api/ai/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: res.data.reply || "No response from AI." },
      ]);
    } catch (error) {
      console.error("File upload error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ File upload failed." },
      ]);
    }
  };

  return (
    <div className="bg-gradient-to-br from-cyan-900 to-blue-900 flex-1 flex flex-col pt-16">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg max-w-lg break-words ${
              msg.sender === "user"
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-200 text-black self-start mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input + Attach + Send */}
      <div className="p-4 bg-cyan-500 flex items-center">
        {/* Attach Button */}
        <label htmlFor="file-upload" className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600 hover:text-gray-800 transition duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13.5"
            />
          </svg>
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={handleAttachFile}
          className="hidden"
        />

        {/* Input Field */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about health..."
          className="flex-1 border rounded-lg px-3 py-2 mx-2 focus:outline-none"
        />

        {/* Send Button */}
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-cyan-900 text-white rounded-lg hover:bg-green-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWithAssistant;
