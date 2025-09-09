import { createContext, useContext, useEffect, useState } from "react";
import API from "../utils/Api";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize token from localStorage
  const rawToken = localStorage.getItem("token");
  const initialToken =
    rawToken && rawToken !== "null" && rawToken !== "undefined" ? rawToken : null;
  const [token, setToken] = useState(initialToken);

  // Hydrate user from localStorage
  useEffect(() => {
    if (token) {
      const storedUser = localStorage.getItem("user");
      if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
        try {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser && (parsedUser._id || parsedUser.id)) {
            setUser(parsedUser);
          } else {
            localStorage.removeItem("user");
          }
        } catch {
          localStorage.removeItem("user");
        }
      }
    }
    setLoading(false);
  }, [token]);

  // Check token expiration
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) logout();
      } catch {
        logout();
      }
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await API.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    setToken(res.data.token);
    setUser(res.data.user);
  };

  const signup = async (name, username, email, password) => {
    await API.post("/auth/signup", { name, username, email, password });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();
    setToken(null);
    setUser(null);
    window.location.href = "/";
  };

  const updateUser = (newUser) => {
    if (newUser && newUser._id) {
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, signup, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
