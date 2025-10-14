import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import loginBg from "../assets/bg.png";
import { useAuth } from "../context/AuthContext.jsx";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const { login, googleAuth } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      await login(email, password);
      setMessage({ type: "success", text: "Login successful! Redirecting..." });
      setTimeout(() => navigate("/"), 1500);
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
          src={loginBg}
          alt="abstract background"
          className="absolute inset-0 w-full h-full object-cover opacity-60 z-0 pointer-events-none"
        />

        <motion.div
          variants={formVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 backdrop-blur-xl bg-white/10 p-10 rounded-3xl shadow-2xl border border-white/20 w-96 mt-12 flex flex-col justify-center"
        >
          <h2 className="text-4xl font-extrabold mb-6 text-center">Welcome Back</h2>
          <p className="text-center text-white/80 mb-8">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
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
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="mt-6 flex items-center justify-center">
            <div className="w-1/4 border-t border-white/30"></div>
            <span className="text-white/70 mx-3 text-sm">or</span>
            <div className="w-1/4 border-t border-white/30"></div>
          </div>

          <div className="mt-6 flex justify-center">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                const token = credentialResponse.credential;
                try {
                  await googleAuth(token);
                  setMessage({ type: "success", text: "Google login successful!" });
                  setTimeout(() => navigate("/"), 1500);
                } catch (err) {
                  console.error(err);
                  setMessage({ type: "error", text: "Google login failed" });
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
            Don't have an account?{" "}
            <Link to="/signup" className="text-white font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
