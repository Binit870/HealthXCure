// fully responsive community page with a feed of posts and comments
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

import { FaUserCircle, FaPaperPlane, FaSpinner } from 'react-icons/fa';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import API from '../utils/Api';
import { SOCKET_URL } from "../utils/Api";


// Connect to backend via socket.io
const socket = io(SOCKET_URL, {
  transports: ["websocket"], 
  withCredentials: true,
});


const Community = () => {
    const { user, token } = useAuth();
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(true);
    const [isPosting, setIsPosting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const headers = token ? { Authorization: `Bearer ${token}` } : {};
                const response = await API.get('/community/posts', {
                    headers
                });
                setPosts(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch community posts:", err);
                setError("Failed to load community posts. Please try again later.");
                setLoading(false);
            }
        };

        fetchPosts();

        socket.on('newPost', (post) => {
            setPosts(prevPosts => [post, ...prevPosts]);
        });
        
        return () => {
            socket.off('newPost');
        };
    }, [token]);

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        
        // Correct check: Redirect to login if a user object or user ID does not exist
        if (!user || !user.id) {
            navigate('/login');
            return;
        }

        if (!newComment.trim() || isPosting) return;

        setIsPosting(true);
        try {
            const response = await API.post('/community/posts', 
                { content: newComment },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            socket.emit('postComment', response.data);
            setNewComment("");
        } catch (err) {
            console.error("Failed to post comment:", err);
            alert("Failed to share your thought. Please try again.");
        } finally {
            setIsPosting(false);
        }
    };

    if (loading) {
        return (
            <div className="pt-20 text-center text-white min-h-screen flex flex-col items-center justify-center bg-gray-950">
                <FaSpinner className="animate-spin text-5xl mx-auto mb-4" />
                <h3 className="text-4xl font-extrabold text-white">Loading Community...</h3>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="pt-20 text-center text-white min-h-screen flex flex-col items-center justify-center bg-gray-950">
                <h3 className="text-4xl font-extrabold text-red-400">Error</h3>
                <p className="text-gray-300 mt-2">{error}</p>
            </div>
        );
    }

    return (
        <section id="community" className="py-20 px-4 md:px-10 lg:px-20 min-h-screen text-white relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
            <div className="absolute inset-0 z-0">
                <div className="w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 absolute top-1/4 left-1/4 animate-pulse"></div>
                <div className="w-80 h-80 bg-purple-500 rounded-full blur-3xl opacity-20 absolute bottom-1/4 right-1/4 animate-pulse-slow"></div>
            </div>
            
            <div className="relative z-10 max-w-4xl mx-auto">
                <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-center mb-10 drop-shadow-lg">
                    Community Forum
                </h2>
                <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
                    Share your thoughts, ask questions, and connect with others on their health journey.
                </p>

                {/* New Post/Comment Form - Only visible if user is logged in */}
                {user ? (
                    <form onSubmit={handlePostSubmit} className="mb-10 p-6 rounded-3xl backdrop-blur-xl bg-white/10 shadow-xl border border-white/20 transform transition-all hover:scale-[1.01] duration-300">
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
                ) : (
                    <div className="text-center p-6 rounded-3xl backdrop-blur-xl bg-white/10 shadow-xl border border-white/20 mb-10">
                        <p className="text-lg text-white">Log in to share your thoughts. ✨</p>
                    </div>
                )}

                {/* Community Posts Feed - Always visible */}
                {posts.length > 0 ? (
                    <div className="space-y-6">
                        {posts.map(post => (
                            <div key={post._id} className="p-6 rounded-3xl backdrop-blur-xl bg-white/10 shadow-lg border border-white/20 transform transition-all hover:scale-[1.01] duration-300">
                                <div className="flex items-center space-x-4 mb-3">
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
                                        <h4 className="font-bold text-white">{post.user?.name || 'Anonymous'}</h4>
                                        <p className="text-gray-400 text-sm">{new Date(post.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <p className="text-white text-lg">{post.content}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center p-6 rounded-3xl backdrop-blur-xl bg-white/10 shadow-xl border border-white/20">
                        <p className="text-lg text-white/70">No posts yet. Be the first to share a thought! ✨</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Community;