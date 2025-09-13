import React from "react";
import PostItem from "./PostItem";

const PostList = ({ posts, user, handleDeletePost }) => {
  if (!posts.length) {
    return (
      <div className="text-center p-6 rounded-3xl backdrop-blur-xl bg-white/10 shadow-xl border border-white/20">
        <p className="text-lg text-white/70">No posts yet. Be the first to share a thought! ✨</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
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