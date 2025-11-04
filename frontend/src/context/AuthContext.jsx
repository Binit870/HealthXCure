import { createContext, useContext, useEffect, useState } from "react";
import API from "../utils/Api";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load token on app start
  useEffect(() => {
    const rawToken = localStorage.getItem("token");
    if (rawToken && rawToken !== "null" && rawToken !== "undefined") {
      setToken(rawToken);
    }
    setLoading(false);
  }, []);

  // Hydrate user
 // Hydrate user
useEffect(() => {
  if (token) {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
      try {
        const parsedUser = JSON.parse(storedUser);

        if (parsedUser && (parsedUser._id || parsedUser.id)) {
          // ✅ FIX: Ensure correct backend base URL for profile images
          const backendBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

          if (
            parsedUser.profileImageUrl &&
            parsedUser.profileImageUrl.startsWith("/uploads/")
          ) {
            parsedUser.profileImageUrl = `${backendBaseUrl}${parsedUser.profileImageUrl}`;
          }

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



  // Auto logout if token expired
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

  // Normal login
  const login = async (email, password) => {
    const res = await API.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(user));

    localStorage.setItem("user", JSON.stringify(res.data.user));
    setToken(res.data.token);
    setUser(res.data.user);
  };

  // Google login/signup
  const googleAuth = async (googleToken) => {
    const res = await API.post("/auth/google", { token: googleToken });
    const userData = res.data.user;
    const jwtToken = res.data.token;

    localStorage.setItem("token", jwtToken);
    localStorage.setItem("user", JSON.stringify(userData));

    setToken(jwtToken);
    setUser(userData);
  };

  // Signup
  const signup = async (name, username, email, password) => {
    await API.post("/auth/signup", { name, username, email, password });
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();
    setToken(null);
    setUser(null);
    window.location.href = "/";
  };

  // Update user info
  const updateUser = (newUser) => {
    if (newUser && newUser._id) {
      const freshUser = { ...newUser };
      setUser(freshUser);
      localStorage.setItem("user", JSON.stringify(freshUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        googleAuth,
        logout,
        signup,
        updateUser,
        loading,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
