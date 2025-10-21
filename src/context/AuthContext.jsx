import { createContext, useState, useEffect } from "react";
import { getUserProfile, loginUser, registerUser } from "../utils/api";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const userData = await getUserProfile();
      setUser(userData);
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const { token, user: userData } = await loginUser({ email, password });

      // Save token first
      localStorage.setItem("token", token);

      // Then update user state
      setUser(userData);

      return userData;
    } catch (error) {
      console.error("Login failed:", error);
      localStorage.removeItem("token");
      setUser(null);
      throw error;
    }
  };

  const register = async (email, password, fullName) => {
    try {
      await registerUser({
        email,
        password,
        full_name: fullName,
      });
      // Don't store token or update user state after registration
      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
