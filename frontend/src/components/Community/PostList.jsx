import React from "react";
import PostItem from "./PostItem";

const PostList = ({ posts, user, handleDeletePost }) => {
  if (!posts.length) {
    return (
      <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-white to-teal-50 shadow-md border border-gray-200 w-full max-w-3xl mx-auto">
        <p className="text-sm sm:text-lg text-gray-600">
          No posts yet. Be the first to share a thought! ✨
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full max-w-3xl mx-auto">
      {posts.map((post) => (
        <PostItem
          key={post._id}
          post={post}
          user={user}
          handleDeletePost={handleDeletePost}
        />
      ))}
    </div>
  );
};

export default PostList;
