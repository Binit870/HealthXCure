import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import signupBg from "../assets/bg.png";
import { useAuth } from "../context/AuthContext.jsx";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

import API from "../utils/Api";

const Signup = () => {
  const { signup, googleAuth } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      await signup(name, username, email, password);

      setMessage({ type: "success", text: "Signup successful! Redirecting to login..." });

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      setMessage({ type: "error", text: error.message });
      setIsLoading(false);
    }
  };

  // Framer Motion variants for the main container
  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative text-white">
      {/* Background Image */}
      <img
        src={signupBg}
        alt="abstract background"
        className="absolute inset-0 w-full h-full object-cover opacity-60 z-0 pointer-events-none"
      />

      {/* Signup Box */}
      <motion.div
        variants={formVariants}
        initial="hidden"
        animate="visible"
        // Removed fixed min-height for better responsiveness
        className="relative z-10 backdrop-blur-xl bg-white/10 p-10 rounded-3xl shadow-2xl border border-white/20 w-96 flex flex-col justify-center"
      >
        <h2 className="text-4xl font-extrabold mb-6 text-center tracking-wide drop-shadow-lg">
          Create an Account
        </h2>
        <p className="text-center text-white/80 mb-8">
          Join HealthXCure to get started
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <input
            type="text"
            placeholder="Full Name"
            className="px-5 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 border border-white/30 
                      focus:outline-none focus:ring-2 focus:ring-white transition-colors"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Username"
            className="px-5 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 border border-white/30 
                      focus:outline-none focus:ring-2 focus:ring-white transition-colors"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="px-5 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 border border-white/30 
                      focus:outline-none focus:ring-2 focus:ring-white transition-colors"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="px-5 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 border border-white/30 
                      focus:outline-none focus:ring-2 focus:ring-white transition-colors"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-white/20 border border-white/30 
                      hover:bg-white/30 text-white font-semibold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                {/* Simple loading spinner */}
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Signing up...
              </div>
            ) : "Signup"}
          </button>
        </form>
        <div className="mt-6 flex justify-center">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              const token = credentialResponse.credential;
              try {
                await googleAuth(token);
                setMessage({ type: "success", text: "Google signup successful!" });
                setTimeout(() => navigate("/"), 1500);
              } catch (err) {
                console.error(err);
                setMessage({ type: "error", text: "Google signup failed" });
              }
            }}
            onError={() => setMessage({ type: "error", text: "Google signup failed" })}
          />
        </div>
        {/* Display the message here */}
        {message.text && (
          <p className={`mt-6 text-center text-sm font-medium ${message.type === 'success' ? 'text-green-400' : 'text-red-400'
            }`}>
            {message.text}
          </p>
        )}

        {/* Login Link */}
        <p className="mt-8 text-center text-white/80 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-white font-semibold hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;