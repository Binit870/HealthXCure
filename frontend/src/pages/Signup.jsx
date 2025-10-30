import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import signupBg from "../assets/bg.png";
import { useAuth } from "../context/AuthContext.jsx";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

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
      setMessage({ type: "success", text: "Signup successful! Redirecting..." });
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setMessage({ type: "error", text: error.message });
      setIsLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="min-h-screen flex items-center justify-center relative text-white">
        <img
          src={signupBg}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover opacity-60 z-0 pointer-events-none"
        />

        <motion.div
          variants={formVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 backdrop-blur-xl bg-white/10 p-10 rounded-3xl shadow-2xl border border-white/20 w-96 flex flex-col justify-center"
        >
          <h2 className="text-4xl font-extrabold mb-6 text-center">Create an Account</h2>
          <p className="text-center text-white/80 mb-8">Join HealthXCure to get started</p>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="px-5 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 border border-white/30 focus:ring-2 focus:ring-white"
            />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="px-5 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 border border-white/30 focus:ring-2 focus:ring-white"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-5 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 border border-white/30 focus:ring-2 focus:ring-white"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="px-5 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 border border-white/30 focus:ring-2 focus:ring-white"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 rounded-xl bg-white/20 border border-white/30 hover:bg-white/30 text-white font-semibold"
            >
              {isLoading ? "Signing up..." : "Signup"}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 flex items-center justify-center">
            <div className="w-1/4 border-t border-white/30"></div>
            <span className="text-white/70 mx-3 text-sm">or</span>
            <div className="w-1/4 border-t border-white/30"></div>
          </div>

          {/* Google Signup */}
          <div className="flex justify-center mt-4">
            <GoogleLogin
  text="signup_with"
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
  onError={() => setMessage({ type: "error", text: "Google login failed" })}
/>

          </div>

          {message.text && (
            <p
              className={`mt-6 text-center text-sm font-medium ${
                message.type === "success" ? "text-green-400" : "text-red-400"
              }`}
            >
              {message.text}
            </p>
          )}

          <p className="mt-8 text-center text-white/80 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-white font-semibold hover:underline">
              Login
            </Link>
          </p>
        </motion.div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Signup;
