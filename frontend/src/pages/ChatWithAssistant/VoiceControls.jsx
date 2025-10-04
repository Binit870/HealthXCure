import React from "react";
import { FaMicrophone, FaTimes } from "react-icons/fa";

const VoiceControls = ({ isListening, setIsListening, recognitionRef, setInput, handleSend }) => {
  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) return alert("Speech recognition not supported.");
    const recognition = new window.webkitSpeechRecognition();
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognitionRef.current = recognition;

    recognition.onstart = () => { setIsListening(true); setInput("Listening..."); window.speechSynthesis.cancel(); };
    recognition.onresult = (event) => { handleSend(event.results[0][0].transcript); setIsListening(false); };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  const cancelListening = () => {
    recognitionRef.current?.abort();
    setIsListening(false);
    setInput("");
  };

  return isListening ? (
    <button
      onClick={cancelListening}
      className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
    >
      <FaTimes className="text-xl" />
    </button>
  ) : (
    <button
      onClick={startListening}
      className="p-2 rounded-full bg-white/20 text-white hover:bg-red-600 transition-colors duration-200"
    >
      <FaMicrophone className="text-lg" />
    </button>
  );
};

export default VoiceControls;
