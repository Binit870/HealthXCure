import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext.jsx";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { FaHeartbeat } from "react-icons/fa";
import toast from "react-hot-toast"; // ⭐ import toast

const Login = () => {
  const { login, googleAuth } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    await login(email, password);

    toast.success("Login successful...");
    setTimeout(() => navigate("/"), 1500);
  } catch (error) {
    const status = error.response?.status;

    const errorMessage =
      status === 401
        ? "Something went wrong. Please try again."
        : status === 404
        ? "User not found"
        : 
        "Invalid email or password";

    toast.error(errorMessage);

    setIsLoading(false);
  }
};


  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-green-100 p-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="flex flex-col md:flex-row rounded-3xl shadow-2xl overflow-hidden w-full max-w-5xl backdrop-blur-lg border border-emerald-100"
        >
          {/* Left Info Card */}
          <div className="relative flex flex-col justify-center items-center text-center bg-gradient-to-br from-emerald-500 via-teal-500 to-green-400 text-white p-10 md:w-1/2 w-full">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-3xl"></div>
            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <FaHeartbeat className="text-6xl text-white animate-pulse drop-shadow-lg" />
              </div>
              <h1 className="text-4xl font-extrabold mb-4 tracking-wide drop-shadow-md">
                HealthXCure
              </h1>
              <p className="text-white/90 text-lg max-w-sm leading-relaxed mb-6">
                Reimagine your healthcare experience.  
                Secure. Smart. Connected.  
                Stay in control of your health — anytime, anywhere.
              </p>
              <div className="mt-4 h-1 w-16 bg-white/70 rounded-full mx-auto"></div>
            </div>
          </div>

          {/* Right Login Card */}
          <div className="p-10 md:w-1/2 w-full bg-white/80 backdrop-blur-md flex flex-col justify-center">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-3xl font-extrabold mb-6 text-center text-emerald-700"
            >
              Welcome Back
            </motion.h2>
            <p className="text-center text-gray-500 mb-8">
              Sign in to your account
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm hover:shadow-md transition-all"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="px-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm hover:shadow-md transition-all"
              />

              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md hover:shadow-lg transition-all"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-center">
              <div className="w-1/4 border-t border-gray-300"></div>
              <span className="text-gray-400 mx-3 text-sm">or</span>
              <div className="w-1/4 border-t border-gray-300"></div>
            </div>

            <div className="mt-6 flex justify-center">
              <GoogleLogin
  onSuccess={async (credentialResponse) => {
    const token = credentialResponse.credential;

    try {
      await googleAuth(token);
      toast.success("Login successful...");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error(error);

      const status = error.response?.status;
      const errorMessage =
        status === 401
          ? "Invalid credentials"
          : status === 404
          ? "User not found"
          : "Something went wrong. Please try again.";

      toast.error(errorMessage);
    }
  }}
  onError={() => toast.error("Login failed. Please try again.")}
/>

            </div>

            <p className="mt-8 text-center text-gray-600 text-sm">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-emerald-600 font-semibold hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
