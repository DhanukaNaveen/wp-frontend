// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

const API_BASE_URL = "http://localhost:5000"; 

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("adminToken") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Start loading if a token exists, forcing ProtectedRoute to wait for server verification
  const [loading, setLoading] = useState(!!token); 

  const verifyToken = useCallback(async () => {
    // 💡 CLEANUP: setLoading(true) is already set when the token changes, 
    // but placing it here ensures it runs if the function is called directly later.
    setLoading(true); 
    
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return false;
    }
    
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/check-auth`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
      });

      if (res.ok) {
        setIsAuthenticated(true);
      } else {
        setToken(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      // This is where your current hang results in a timeout/network error
      console.error("Token verification error (Backend hang/Network failure):", error);
      setToken(null);
      setIsAuthenticated(false);
    } finally {
      // CRITICAL: This MUST run to resolve the "Verifying session..." screen.
      setLoading(false); 
    }
  }, [token]); // token is the only dependency that changes

  useEffect(() => {
    if (token) {
      localStorage.setItem("adminToken", token);
      verifyToken(); 
    } else {
      localStorage.removeItem("adminToken");
      setIsAuthenticated(false);
      setLoading(false); // Resolve loading immediately if no token exists
    }
  }, [token, verifyToken]);

  async function login(email, password) {
    setLoading(true); // Start loading for the login button spinner
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        setToken(data.token); 
        toast.success("Login successful!");
        // The setToken call triggers useEffect -> verifyToken, which handles final setLoading(false)
        return true;
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Login failed. Check credentials.");
        return false;
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Network error during login.");
      return false;
    } finally {
      // 💡 FIX: Only set loading to false here if the login explicitly failed 
      // (The token wasn't set). On success, we rely on verifyToken to resolve loading.
      if (!token) { 
        setLoading(false); 
      }
    }
  }

  function logout() {
    setToken(null);
    toast("Logged out.", { icon: '👋' });
  }

  const value = {
    token,
    isAuthenticated,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}