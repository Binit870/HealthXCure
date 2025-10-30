import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Draggable from "react-draggable";
import chatbotIcon from "../../assets/health-chatbot-icon.png";

const ChatbotLauncher = () => {
  const navigate = useNavigate();
  const nodeRef = useRef(null);

  const handleClick = () => {
    navigate("/chat");
  };

  return (
    <Draggable nodeRef={nodeRef} bounds="body">
      <div
        ref={nodeRef}
        className="fixed bottom-6 right-6 z-[9999]"
        style={{ touchAction: "none" }}
      >
        <button
          onClick={handleClick}
          className="bg-green-50 border border-green-300 shadow-md rounded-full p-3 hover:bg-green-100 transition-all"
          title="Chat with Cura"
        >
          <img
            src={chatbotIcon}
            alt="HealthCure Chatbot"
            className="w-8 h-8"
            style={{
              filter:
                "brightness(0) saturate(100%) invert(17%) sepia(98%) saturate(748%) hue-rotate(88deg) brightness(90%) contrast(90%)",
            }}
          />
        </button>
      </div>
    </Draggable>
  );
};

export default ChatbotLauncher;
