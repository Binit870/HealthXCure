import React, { useState, useRef, useEffect } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import API from "../../utils/Api";

const ChatWithAssistant = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I'm your AI Health Assistant. Ask me anything about health." },
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [speakingText, setSpeakingText] = useState(null);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), [messages]);

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleSend = async (msg = input) => {
    if (!msg.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: msg }]);
    setInput("");
    try {
      const res = await API.post("/ai/chat", { message: msg });
      setMessages((prev) => [...prev, { sender: "bot", text: res.data.reply || "No response." }]);
    } catch {
      setMessages((prev) => [...prev, { sender: "bot", text: "❌ Sorry, something went wrong." }]);
    }
  };

  return (
    <div className="bg-gradient-to-br from-cyan-900 to-blue-900 flex-1 flex flex-col pt-16">
      <ChatMessages
        messages={messages}
        speakingText={speakingText}
        setSpeakingText={setSpeakingText}
      />
      <ChatInput
        input={input}
        setInput={setInput}
        handleSend={handleSend}
        isListening={isListening}
        setIsListening={setIsListening}
        recognitionRef={recognitionRef}
        setMessages={setMessages}
      />
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatWithAssistant;
