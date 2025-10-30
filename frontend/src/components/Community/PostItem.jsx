import React from "react";
import { FaUserCircle, FaTrash } from "react-icons/fa";

const PostItem = ({ post, user, handleDeletePost }) => {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-teal-50 shadow-md border border-gray-200 transition-all hover:shadow-lg hover:scale-[1.01] duration-300 w-full max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-3">
        <div className="flex items-center gap-4">
          {post.user?.profileImageUrl ? (
            <img
              src={post.user.profileImageUrl}
              alt={`${post.user.name}'s profile`}
              className="w-10 h-10 rounded-full object-cover border-2 border-teal-400"
            />
          ) : (
            <FaUserCircle className="w-10 h-10 text-gray-400" />
          )}
          <div>
            <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
              {post.user?.name || "Anonymous"}
            </h4>
            <p className="text-gray-500 text-xs sm:text-sm">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {user && user._id === post.user?._id && (
          <button
            onClick={() => handleDeletePost(post._id)}
            className="text-red-500 hover:text-red-600 transition-colors duration-300"
            title="Delete post"
          >
            <FaTrash className="w-4 h-4" />
          </button>
        )}
      </div>

      <p className="text-gray-700 text-sm sm:text-base whitespace-pre-line">{post.content}</p>
    </div>
  );
};

export default PostItem;
