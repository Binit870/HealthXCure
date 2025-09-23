import React, { useState } from "react";
import { FaPaperPlane, FaSpinner } from "react-icons/fa";
import API from "../../utils/Api";

const PostForm = ({ socket, user, token }) => {
  const [newComment, setNewComment] = useState("");
  const [category, setCategory] = useState("general");
  const [isPosting, setIsPosting] = useState(false);

  const handlePostSubmit = async () => {
    if (!newComment.trim() || isPosting) return;

    setIsPosting(true);
    try {
      const response = await API.post(
        "/community/posts",
        { content: newComment, category },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      socket.emit("postComment", response.data);
      setNewComment("");
      setCategory("general");
    } catch (err) {
      console.error("Failed to post comment:", err);
      alert("Failed to share your thought. Please try again.");
    } finally {
      setIsPosting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handlePostSubmit();
    }
  };

  return (
    <div className="mb-10 p-4 sm:p-6 rounded-3xl backdrop-blur-xl bg-white/10 shadow-xl border border-white/20 w-full max-w-3xl mx-auto">
      <div className="flex flex-col space-y-4">
        {/* Category select */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
        >
          <option value="general">General</option>
          <option value="nutrition">Nutrition</option>
          <option value="fitness">Fitness</option>
          <option value="health">Health</option>
        </select>

        {/* Textarea with embedded icon */}
        <div className="relative">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What's on your mind? Press Enter to send"
            className="w-full p-4 pr-12 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all duration-300 text-sm sm:text-base"
            rows="3"
            disabled={isPosting}
          ></textarea>
          <button
            type="button"
            onClick={handlePostSubmit}
            disabled={isPosting || !newComment.trim()}
            className="absolute bottom-3 right-3 text-blue-400 hover:text-blue-500 disabled:text-gray-500"
            title="Send"
          >
            {isPosting ? (
              <FaSpinner className="animate-spin text-lg" />
            ) : (
              <FaPaperPlane className="text-lg" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
