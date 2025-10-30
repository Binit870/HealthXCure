import React, { useState, useRef, useEffect } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import API from "../../utils/Api";
import "./ChatWithAssistant.css"; // Make sure this is imported!

const ChatWithAssistant = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I’m Cura — your personal Health Assistant. Ask me about symptoms, wellness, or fitness!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [speakingText, setSpeakingText] = useState(null);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: res.data.reply || "No response." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Sorry, something went wrong." },
      ]);
    }
  };

  const floatingParticleAnimation = (
    moveName,
    moveDuration,
    moveDelay,
    pulseDuration,
    pulseDelay
  ) =>
    `${moveName} ${moveDuration} linear ${moveDelay} infinite both, softPulse ${pulseDuration} ease-in-out ${pulseDelay} infinite both`;

  // Utility to create multiple floating particles
const generateParticles = (count) => {
  const icons = [
    // 💬 Chat Bubble
    (color) => (
      <svg width="60" height="60" viewBox="0 0 24 24" fill={color}>
        <path d="M4 4h16v12H5.17L4 17.17V4zM2 2v20l4-4h16a2 2 0 0 0 2-2V2H2z" />
      </svg>
    ),
    // ❤️ Heart
    (color) => (
      <svg width="65" height="65" viewBox="0 0 24 24" fill={color}>
        <path d="M12 21s-8-6.6-8-11.2S7 2 12 6.2 20 3.8 20 9.8 12 21 12 21z" />
      </svg>
    ),
    // 🩺 Stethoscope
    (color) => (
      <svg width="65" height="65" viewBox="0 0 24 24" fill={color}>
        <path d="M18 3a1 1 0 0 0-1 1v5a3 3 0 1 1-6 0V4a1 1 0 0 0-2 0v5a5 5 0 0 0 10 0V4a1 1 0 0 0-1-1zM20 13a2 2 0 0 0-2 2v1a4 4 0 0 1-8 0v-1h-2v1a6 6 0 0 0 12 0v-1a2 2 0 0 0-2-2z" />
      </svg>
    ),
    // 💊 Capsule
    (color) => (
      <svg width="60" height="60" viewBox="0 0 24 24" fill={color}>
        <path d="M8 2a6 6 0 0 0-6 6v8a6 6 0 0 0 12 0V8a6 6 0 0 0-6-6zm8 6a6 6 0 0 0-6 6v8a6 6 0 0 0 12 0v-8a6 6 0 0 0-6-6z" />
      </svg>
    ),
    // 💬 Message Dots
    (color) => (
      <svg width="65" height="65" viewBox="0 0 24 24" fill={color}>
        <path d="M21 6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14l4-4h12a2 2 0 0 0 2-2V6zM7 11h2v2H7v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z" />
      </svg>
    ),
  ];

  const colors = ["#06b6d4", "#14b8a6", "#0d9488", "#22d3ee"];
  const particles = [];

  // Define grid zones (e.g. 4x4 grid)
  const gridCols = 4;
  const gridRows = 4;
  const cellWidth = 100 / gridCols;
  const cellHeight = 100 / gridRows;

  for (let i = 0; i < count; i++) {
    const Icon = icons[i % icons.length];
    const gridX = i % gridCols;
    const gridY = Math.floor(i / gridCols) % gridRows;

    // Randomize position within each grid cell
    const left = `${gridX * cellWidth + Math.random() * (cellWidth - 10)}%`;
    const top = `${gridY * cellHeight + Math.random() * (cellHeight - 10)}%`;

    const moveType = Math.random() > 0.5 ? "floatMoveA" : "floatMoveB";
    const moveDuration = `${18 + Math.random() * 10}s`;
    const moveDelay = `${-Math.random() * 8}s`;
    const pulseDuration = `${6 + Math.random() * 4}s`;
    const pulseDelay = `${Math.random() * 3}s`;
    const color = colors[Math.floor(Math.random() * colors.length)];

    particles.push(
      <div
        key={i}
        className="absolute [will-change:transform,opacity]"
        style={{
          left,
          top,
          width: 90,
          height: 90,
          opacity: 0.65,
          color,
          animation: floatingParticleAnimation(
            moveType,
            moveDuration,
            moveDelay,
            pulseDuration,
            pulseDelay
          ),
          filter: "drop-shadow(0 0 12px rgba(0,0,0,0.1))",
        }}
      >
        {Icon(color)}
      </div>
    );
  }

  return particles;
};



  return (
    <div className="flex-1 flex flex-col pt-16 relative overflow-hidden">
      {/* Animated Background */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-0">
        <div
          className="chat-bg-gradient"
          style={{
            background: `
              radial-gradient(1200px 600px at 10% 20%, rgba(34, 227, 218, 0.08), transparent 8%),
              radial-gradient(1000px 500px at 90% 85%, rgba(6, 182, 212, 0.08), transparent 8%),
              linear-gradient(180deg, #e6fffa 0%, #ccfbf1 100%)
            `,
          }}
        />
        {generateParticles(18)}
      </div>

      {/* Chat UI */}
      <div className="relative z-10 flex-1 flex flex-col">
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
    </div>
  );
};

export default ChatWithAssistant;
