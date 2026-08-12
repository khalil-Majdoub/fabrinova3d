import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(Boolean(localStorage.getItem("token")));

  useEffect(() => {
    let active = true;
    if (!token) {
      setLoading(false);
      return () => { active = false; };
    }

    setLoading(true);
    api.get("/auth/me")
      .then(({ data }) => {
        if (active) setUser(data);
      })
      .catch(() => {
        localStorage.removeItem("token");
        if (active) {
          setToken(null);
          setUser(null);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, [token]);

  const startSession = (data) => {
    localStorage.setItem("token", data.token);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    return startSession(data);
  };

  const loginAdmin = async (email, password) => {
    const { data } = await api.post("/auth/admin/login", { email, password });
    return startSession(data);
  };

  const signup = async (name, email, password) => {
    const { data } = await api.post("/auth/signup", { name, email, password });
    return startSession(data);
  };

  const setupAdmin = async (name, email, password, setupKey) => {
    const { data } = await api.post("/auth/setup-admin", { name, email, password, setupKey });
    return startSession(data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, loginAdmin, signup, setupAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
