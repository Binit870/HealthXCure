// src/components/community/PostForm.jsx
import React, { useState } from "react";
import { FaUserCircle, FaPaperPlane, FaSpinner } from "react-icons/fa";
import API from "../../utils/Api";

const PostForm = ({ socket, user, token }) => {
  const [newComment, setNewComment] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || isPosting) return;

    setIsPosting(true);
    try {
      const response = await API.post(
        "/community/posts",
        { content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      socket.emit("postComment", response.data);
      setNewComment("");
    } catch (err) {
      console.error("Failed to post comment:", err);
      alert("Failed to share your thought. Please try again.");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <form
      onSubmit={handlePostSubmit}
      className="mb-10 p-6 rounded-3xl backdrop-blur-xl bg-white/10 shadow-xl border border-white/20 transform transition-all hover:scale-[1.01] duration-300"
    >
      <div className="flex items-start space-x-4">
        {user.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="User Profile"
            className="w-12 h-12 rounded-full object-cover border-2 border-white"
          />
        ) : (
          <FaUserCircle className="w-12 h-12 text-gray-400" />
        )}
        <div className="flex-1 relative">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-4 pr-12 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none"
            rows="3"
            disabled={isPosting}
          ></textarea>
          <button
            type="submit"
            className="absolute right-3 bottom-3 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
            disabled={isPosting || !newComment.trim()}
          >
            {isPosting ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostForm;
