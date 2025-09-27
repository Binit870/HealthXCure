import React from "react";
import { FaUserCircle, FaTrash } from "react-icons/fa";

const PostItem = ({ post, user, handleDeletePost }) => {
  return (
    <div className="p-4 sm:p-6 rounded-3xl backdrop-blur-xl bg-white/10 shadow-lg border border-white/20 transform transition-all hover:scale-[1.01] duration-300 w-full max-w-3xl mx-auto">
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-3">
    <div className="flex items-center space-x-4">
      {post.user?.profileImageUrl ? (
        <img
          src={post.user.profileImageUrl}
          alt={`${post.user.name}'s profile`}
          className="w-10 h-10 rounded-full object-cover border-2 border-blue-400"
        />
      ) : (
        <FaUserCircle className="w-10 h-10 text-gray-400" />
      )}
      <div>
        <h4 className="font-bold text-white text-sm sm:text-base">{post.user?.name || "Anonymous"}</h4>
        <p className="text-gray-400 text-xs sm:text-sm">
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>

    {user && user._id === post.user?._id && (
      <button
        onClick={() => handleDeletePost(post._id)}
        className="text-red-400 hover:text-red-500 transition-colors duration-300"
        title="Delete post"
      >
        <FaTrash className="w-4 h-4" />
      </button>
    )}
  </div>

  <p className="text-white text-sm sm:text-base">{post.content}</p>
</div>

  );
};

export default PostItem;