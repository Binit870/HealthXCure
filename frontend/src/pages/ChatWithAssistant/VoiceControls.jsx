import React from "react";
import { FaMicrophone, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

const VoiceControls = ({ isListening, setIsListening, recognitionRef, setInput, handleSend }) => {
  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      toast.error("Speech recognition not supported on this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognitionRef.current = recognition;

    recognition.onstart = () => {
      setIsListening(true);
      setInput("Listening...");
      window.speechSynthesis.cancel();
    };
    recognition.onresult = (event) => {
      handleSend(event.results[0][0].transcript);
      setIsListening(false);
    };
    recognition.onerror = () => {
      setIsListening(false);
      toast.error("Voice recognition error.");
    };
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
      className="p-2 sm:p-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 flex items-center justify-center"
      title="Stop Listening"
    >
      <FaTimes className="text-base sm:text-xl" />
    </button>
  ) : (
    <button
      onClick={startListening}
      className="p-2 sm:p-3 rounded-full bg-white/20 text-white hover:bg-red-600 transition-colors duration-200 flex items-center justify-center"
      title="Start Voice Input"
    >
      <FaMicrophone className="text-base sm:text-xl" />
    </button>
  );
};

export default VoiceControls;
