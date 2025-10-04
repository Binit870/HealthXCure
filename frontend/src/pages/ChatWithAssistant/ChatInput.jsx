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
    <div className="p-4 bg-cyan-500 flex items-center">
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
        className="flex-1 border rounded-lg px-3 py-2 mx-2 focus:outline-none"
        disabled={isListening}
      />
      <button
        onClick={() => handleSend()}
        className="px-4 py-2 bg-cyan-900 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
