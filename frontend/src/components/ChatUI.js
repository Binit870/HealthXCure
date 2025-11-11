import React from 'react';

const ChatUI = () => {
  return (
    <div className="flex flex-col h-full p-4">
      {/* Replace this with your actual chat logic */}
      <div className="flex-grow overflow-y-auto bg-gray-100 rounded p-2 mb-2">
        <p className="text-gray-700">Hi! I'm Cura. How can I help you today?</p>
        {/* Map chat messages here */}
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        className="border rounded px-3 py-2 w-full"
      />
    </div>
  );
};

export default ChatUI;
