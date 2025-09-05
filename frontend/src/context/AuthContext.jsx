/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import API from "../utils/Api"; // use only API, not axios

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

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

  // ✅ Signup
  const signup = async (name, username, email, password) => {
    try {
      await API.post("/auth/signup", { name, username, email, password });
    } catch (err) {
      throw new Error(err.response?.data?.message || "Signup failed");
    }
  };

  // ✅ Login
  const login = async (email, password) => {
    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setToken(res.data.token);
      setUser(res.data.user);
    } catch (err) {
      throw new Error(err.response?.data?.message || "Login failed");
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

  return (
    <AuthContext.Provider value={{ user, token, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
