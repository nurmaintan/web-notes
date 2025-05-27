import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cek token di localStorage saat pertama kali load
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setAccessToken(token);
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  // Login
  const login = async (email, password) => {
    const res = await axios.post(`${BASE_URL}/login`, { email, password }, { withCredentials: true });
    setUser(res.data.safeUserData);
    setAccessToken(res.data.accessToken);
    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("user", JSON.stringify(res.data.safeUserData));
  };

  // Register
  const register = async (email, username, password) => {
    await axios.post(`${BASE_URL}/register`, { email, username, password });
  };

  // Logout
  const logout = async () => {
    await axios.delete(`${BASE_URL}/logout`, { withCredentials: true });
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
