/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const API_URL = "http://localhost:5000/api/auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Sanitize token from localStorage
  const rawToken = localStorage.getItem("token");
  const initialToken =
    rawToken && rawToken !== "null" && rawToken !== "undefined" ? rawToken : null;
  const [token, setToken] = useState(initialToken);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user data from localStorage", error);
        localStorage.removeItem("user");
        setUser(null);
      }
    }
  }, [token]);

  // Signup
  const signup = async (name, username, email, password) => {
    try {
      await axios.post(`${API_URL}/signup`, { name, username, email, password });
    } catch (err) {
      throw new Error(err.response?.data?.message || "Signup failed");
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setToken(res.data.token);
      setUser(res.data.user);

      // Optional: Set global Axios header
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Login failed");
    }
  };

  // Logout
  const logout = () => {
  // Clear everything related to auth
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  sessionStorage.clear(); // just in case anything is stored there

  // Clear Axios headers
  delete axios.defaults.headers.common["Authorization"];

  // Reset state
  setToken(null);
  setUser(null);

  // Force reload to reset all components
  window.location.href = "/login"; // redirect to login instead of reload
};


  return (
    <AuthContext.Provider value={{ user, token, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
