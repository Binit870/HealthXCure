import React, { useState } from "react";
import { FaUserCircle, FaPaperPlane, FaSpinner } from "react-icons/fa";
import API from "../../utils/Api";

const PostForm = ({ socket, user, token }) => {
  const [newComment, setNewComment] = useState("");
  const [category, setCategory] = useState("general");
  const [isPosting, setIsPosting] = useState(false);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
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

  return (
    <form
      onSubmit={handlePostSubmit}
      className="mb-10 p-6 rounded-3xl backdrop-blur-xl bg-white/10 shadow-xl border border-white/20 transform transition-all hover:scale-[1.01] duration-300"
    >
      <div className="flex flex-col space-y-4">
        {/* Post input */}
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full p-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all duration-300"
          rows="3"
          disabled={isPosting}
        ></textarea>

        {/* Category select */}
        <div className="relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
          >
            <option value="general">General</option>
            <option value="nutrition">Nutrition</option>
            <option value="fitness">Fitness</option>
            <option value="health">Health</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l-4.243-4.242a.999.999 0 0 1 1.414-1.414L10 10.586l3.536-3.536a.999.999 0 1 1 1.414 1.414l-4.243 4.242a1 1 0 0 1-1.414 0z"/></svg>
          </div>
        </div>

        {/* Submit button with icon */}
        <button
          type="submit"
          className="self-end px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
          disabled={isPosting || !newComment.trim()}
        >
          {isPosting ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <>
              <span>Post</span>
              <FaPaperPlane className="ml-2" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default PostForm;