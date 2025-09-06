/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import API from "../utils/Api";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Sanitize token from localStorage
  const rawToken = localStorage.getItem("token");
  const initialToken =
    rawToken && rawToken !== "null" && rawToken !== "undefined" ? rawToken : null;
  const [token, setToken] = useState(initialToken);

  // ✅ Hydrate user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("Attempting to hydrate user from localStorage. Stored user:", storedUser); // <-- Add this
    if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && (parsedUser._id || parsedUser.id)) {
          console.log("Successfully parsed user:", parsedUser); // <-- Add this
          setUser(parsedUser);
        } else {
          console.error("User data from localStorage is missing _id."); // <-- Add this
          localStorage.removeItem("user");
        }
      } catch (error) {
        console.error("Failed to parse user data from localStorage", error);
        localStorage.removeItem("user");
        setUser(null);
      }
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await API.post("/auth/login", { email, password });
      console.log("Login successful. Received data:", res.data); // <-- Add this

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setToken(res.data.token);
      setUser(res.data.user);
    } catch (err) {
      console.error("Login failed:", err.response?.data?.message || err.message); // <-- Add this
      throw new Error(err.response?.data?.message || "Login failed");
    }
  };
  // ✅ Signup
  const signup = async (name, username, email, password) => {
    try {
      await API.post("/auth/signup", { name, username, email, password });
    } catch (err) {
      throw new Error(err.response?.data?.message || "Signup failed");
    }
  };

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();

    setToken(null);
    setUser(null);

    window.location.href = "/login";
  };

  // ✅ Update user after image upload or profile change
  const updateUser = (newUser) => {
    if (newUser && newUser._id) {
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, signup, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
