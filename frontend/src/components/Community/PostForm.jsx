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
    <div className="mb-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white to-teal-50 shadow-lg border border-gray-200 w-full max-w-3xl mx-auto">
      <div className="flex flex-col space-y-5">
        {/* Category select */}
        <label className="text-sm font-medium text-gray-700">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm sm:text-base"
        >
          <option value="general">General</option>
          <option value="nutrition">Nutrition</option>
          <option value="fitness">Fitness</option>
          <option value="health">Health</option>
        </select>

        {/* Textarea with embedded icon */}
        <label className="text-sm font-medium text-gray-700">Your Thought</label>
        <div className="relative">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What's on your mind? Press Enter to send"
            className="w-full p-4 pr-12 rounded-lg bg-white text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none transition-all duration-300 text-sm sm:text-base"
            rows="3"
            disabled={isPosting}
          ></textarea>
          <button
            type="button"
            onClick={handlePostSubmit}
            disabled={isPosting || !newComment.trim()}
            className="absolute bottom-3 right-3 text-teal-500 hover:text-teal-600 disabled:text-gray-400"
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
