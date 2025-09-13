import React from "react";
import API from "../../utils/Api";

const FileUpload = ({ setMessages }) => {
  const handleAttachFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setMessages((prev) => [...prev, { sender: "user", text: `📎 Uploaded: ${file.name}` }]);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await API.post("/ai/upload", formData, { headers: { "Content-Type": "multipart/form-data" } });
      setMessages((prev) => [...prev, { sender: "bot", text: res.data.reply || "No response from AI." }]);
    } catch {
      setMessages((prev) => [...prev, { sender: "bot", text: "❌ File upload failed." }]);
    }
  };

  return (
    <>
      <label htmlFor="file-upload" className="cursor-pointer ml-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white/80 hover:text-white transition duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13.5" />
        </svg>
      </label>
      <input id="file-upload" type="file" onChange={handleAttachFile} className="hidden" />
    </>
  );
};

export default FileUpload;
