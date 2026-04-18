import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from token (auto-login)
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://localhost:5000/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(() => localStorage.removeItem("token"));
    }
  }, []);

  const login = (data) => {
    localStorage.setItem("token", data.token);
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);