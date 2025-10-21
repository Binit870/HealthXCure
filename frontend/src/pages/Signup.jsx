import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext.jsx";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { FaHeartbeat } from "react-icons/fa";

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

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-green-100 p-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="flex flex-col md:flex-row rounded-3xl shadow-2xl overflow-hidden w-full max-w-5xl backdrop-blur-lg border border-emerald-100"
        >
          {/* Left Info Card */}
          <div className="relative flex flex-col justify-center items-center text-center bg-gradient-to-br from-emerald-500 via-teal-500 to-green-400 text-white p-8 md:w-1/2 w-full">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-3xl"></div>
            <div className="relative z-10">
              <div className="flex justify-center mb-5">
                <FaHeartbeat className="text-5xl text-white animate-pulse drop-shadow-lg" />
              </div>
              <h1 className="text-3xl font-extrabold mb-3 tracking-wide drop-shadow-md">
                HealthXCure
              </h1>
              <p className="text-white/90 text-base max-w-sm leading-relaxed mb-5">
                Empowering your wellness journey.  
                Join our platform to connect, consult, and care — all in one place.
              </p>
              <div className="mt-3 h-1 w-12 bg-white/70 rounded-full mx-auto"></div>
            </div>
          </div>

          {/* Right Signup Card */}
          <div className="p-8 md:w-1/2 w-full bg-white/80 backdrop-blur-md flex flex-col justify-center">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-2xl font-extrabold mb-4 text-center text-emerald-700"
            >
              Create an Account
            </motion.h2>
            <p className="text-center text-gray-500 mb-6 text-sm">
              Join HealthXCure to get started
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm hover:shadow-md transition-all"
              />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm hover:shadow-md transition-all"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm hover:shadow-md transition-all"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm hover:shadow-md transition-all"
              />

              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md hover:shadow-lg transition-all"
              >
                {isLoading ? "Signing up..." : "Signup"}
              </button>
            </form>

            {/* Divider */}
            <div className="mt-5 flex items-center justify-center">
              <div className="w-1/4 border-t border-gray-300"></div>
              <span className="text-gray-400 mx-3 text-xs">or</span>
              <div className="w-1/4 border-t border-gray-300"></div>
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
                onError={() =>
                  setMessage({ type: "error", text: "Google signup failed" })
                }
              />
            </div>

            {message.text && (
              <p
                className={`mt-5 text-center text-xs font-medium ${
                  message.type === "success" ? "text-green-600" : "text-red-500"
                }`}
              >
                {message.text}
              </p>
            )}

            <p className="mt-6 text-center text-gray-600 text-xs">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-emerald-600 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Signup;
