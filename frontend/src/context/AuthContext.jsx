import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AuthContext = createContext();

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Set token in axios headers
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  // Load user on mount if token exists
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const response = await axios.get(`${API_URL}/api/auth/me`);
          setUser(response.data.user);
        } catch (error) {
          // Token is invalid, remove it
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  const signup = useCallback(async (name, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/signup`, {
        name,
        email,
        password,
      });
      
      // Signup successful - email verification required
      if (response.data && response.data.requiresVerification) {
        // If email not configured, show code in toast
        if (response.data.emailNotConfigured && response.data.verificationCode) {
          toast.success(
            `Account created! Email not configured. Your verification code is: ${response.data.verificationCode}`,
            { duration: 10000 }
          );
          console.log("📧 Verification Code:", response.data.verificationCode);
        } else {
          // Email service configured - code sent to email
          toast.success(
            `✅ Verification code sent to your email! Please check ${response.data.email || 'your inbox'}`,
            { duration: 8000, icon: '📧' }
          );
        }
        return { 
          success: true, 
          email: response.data.email,
          verificationCode: response.data.verificationCode // Include code if email not configured
        };
      } else {
        console.error("Unexpected response format:", response.data);
        toast.error("Unexpected response from server");
        return { success: false, message: "Unexpected response from server" };
      }
    } catch (error) {
      console.error("Signup error:", error);
      const message = error.response?.data?.error || error.message || "Error creating account";
      toast.error(message);
      return { success: false, message };
    }
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      console.log("🔐 Attempting login for:", email);
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });
      
      console.log("✅ Login response:", response.data);
      const { token: newToken, user: newUser } = response.data;
      
      if (!newToken || !newUser) {
        console.error("❌ Missing token or user in response:", response.data);
        toast.error("Login failed: Invalid response from server");
        return { success: false, message: "Invalid response from server" };
      }
      
      setToken(newToken);
      setUser(newUser);
      toast.success("Login successful!");
      return { success: true };
    } catch (error) {
      console.error("❌ Login error:", error);
      console.error("Error response:", error.response?.data);
      
      // Check if email verification is required
      if (error.response?.data?.requiresVerification) {
        const message = error.response.data.error || "Please verify your email";
        toast.error(message);
        return { 
          success: false, 
          message,
          requiresVerification: true,
          email: error.response.data.email
        };
      }
      
      const message = error.response?.data?.error || error.message || "Invalid email or password";
      toast.error(message);
      return { success: false, message };
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    toast.success("Logged out successfully");
  }, []);

  const value = {
    user,
    setUser,
    loading,
    isAuthenticated: !!user,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

