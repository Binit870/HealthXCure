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
      <div className="pt-20 text-center text-white min-h-screen flex flex-col items-center justify-center bg-cyan-950">
        <FaSpinner className="animate-spin text-5xl mx-auto mb-4" />
        <h3 className="text-4xl font-extrabold text-white">
          Loading Community...
        </h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20 text-center text-white min-h-screen flex flex-col items-center justify-center bg-cyan-950">
        <h3 className="text-4xl font-extrabold text-red-400">Error</h3>
        <p className="text-gray-300 mt-2">{error}</p>
      </div>
    );
  }

  return (
    <section className="py-20 px-4 md:px-10 lg:px-20 min-h-screen text-white relative overflow-hidden bg-gradient-to-br from-cyan-900 via-cyan-800 to-cyan-950">
      {/* Background Blobs */}
      <div className="absolute inset-0 z-0">
        <div className="w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-20 absolute top-1/4 left-1/4 animate-pulse"></div>
        <div className="w-80 h-80 bg-teal-500 rounded-full blur-3xl opacity-20 absolute bottom-1/4 right-1/4 animate-pulse-slow"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400 text-center mb-10 drop-shadow-lg">
          Community Forum ✨
        </h2>
        <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Share your thoughts, ask questions, and connect with others on their
          health journey.
        </p>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
  {["all", "general", "nutrition", "fitness", "health"].map((cat) => (
    <button
      key={cat}
      onClick={() => setCategory(cat)}
      className={`px-4 py-2 text-sm sm:text-base rounded-full transition-all duration-300 transform hover:scale-105 ${
        category === cat
          ? "bg-cyan-600 text-white shadow-lg"
          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
      }`}
    >
      {cat.charAt(0).toUpperCase() + cat.slice(1)}
    </button>
  ))}
</div>


        {user ? (
          <PostForm socket={socket} user={user} token={token} />
        ) : (
          <div className="text-center p-6 rounded-3xl backdrop-blur-xl bg-white/10 shadow-xl border border-white/20 mb-10">
            <p className="text-lg text-white">Log in to share your thoughts. ✨</p>
          </div>
        )}

        <PostList
          posts={posts}
          user={user}
          handleDeletePost={handleDeletePost}
        />
      </div>
    </section>
  );
};

export default Community;
