import React from "react";
import VoiceControls from "./VoiceControls";
import FileUpload from "./FileUpload";

const ChatInput = ({
  input,
  setInput,
  handleSend,
  isListening,
  setIsListening,
  recognitionRef,
  setMessages,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-3 border-t border-teal-600 bg-teal-500">
  {/* 🎙 Voice & 📎 File Upload + Input + Send all in one row */}
  <VoiceControls
    isListening={isListening}
    setIsListening={setIsListening}
    recognitionRef={recognitionRef}
    setInput={setInput}
    handleSend={handleSend}
  />
  <FileUpload setMessages={setMessages} />

  <input
    type="text"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={handleKeyDown}
    placeholder="Ask about health..."
    className="flex-1 text-sm sm:text-base border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300 disabled:opacity-70"
    disabled={isListening}
  />

  <button
    onClick={() => handleSend()}
    className="px-3 sm:px-4 py-2 bg-cyan-900 text-white rounded-lg hover:bg-teal-800 active:scale-95 transition-all duration-150 text-sm sm:text-base whitespace-nowrap"
  >
    Send
  </button>
</div>

  );
};

export default ChatInput;
