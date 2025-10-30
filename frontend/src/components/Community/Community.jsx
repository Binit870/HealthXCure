import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { io } from "socket.io-client";
import API, { SOCKET_URL } from "../../utils/Api";

import PostForm from "./PostForm";
import PostList from "./PostList";

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  withCredentials: true,
});

const Community = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("general");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await API.get(
          `/community/posts?category=${category}`,
          { headers }
        );
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch community posts:", err);
        setError("Failed to load community posts. Please try again later.");
        setLoading(false);
      }
    };

    fetchPosts();

    socket.on("newPost", (post) => {
      if (category === "all" || post.category === category) {
        setPosts((prevPosts) => [post, ...prevPosts]);
      }
    });

    return () => {
      socket.off("newPost");
    };
  }, [token, category]);

  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        if (!user || !user._id) {
          navigate("/login");
          return;
        }
        await API.delete(`/community/posts/${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(posts.filter((post) => post._id !== postId));
      } catch (err) {
        console.error(
          "Failed to delete post:",
          err.response?.data?.message || err.message
        );
        alert(
          "Failed to delete post. Please try again. You can only delete your own posts."
        );
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 to-white text-teal-600">
        <FaSpinner className="animate-spin text-4xl mb-4" />
        <h3 className="text-2xl font-semibold">Loading Community...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-white text-red-500">
        <h3 className="text-2xl font-semibold">Error</h3>
        <p className="text-gray-600 mt-2">{error}</p>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-100 text-gray-800">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-teal-700 mb-4 drop-shadow-sm">
          🌿 Community Forum
        </h2>
        <p className="text-center text-gray-600 mb-10 text-lg">
          Share your thoughts, ask questions, and connect with others on their health journey.
        </p>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {["all", "general", "nutrition", "fitness", "health"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 text-sm rounded-full transition-all duration-300 shadow-sm ${
                category === cat
                  ? "bg-teal-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-teal-100"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Post Form or Login Prompt */}
        {user ? (
          <PostForm socket={socket} user={user} token={token} />
        ) : (
          <div className="text-center p-6 rounded-xl bg-white border border-gray-200 shadow-md mb-10">
            <p className="text-base text-gray-700">Log in to share your thoughts. ✨</p>
          </div>
        )}

        {/* Post List */}
        <PostList posts={posts} user={user} handleDeletePost={handleDeletePost} />
      </div>
    </section>
  );
};

export default Community;
