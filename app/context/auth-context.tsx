"use client";

import { createContext, useContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";

interface User {
  id: string;
  nome: string;
  email: string;
  [key: string]: any; // qualquer outro campo
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwt.decode(token) as User;
        setUser(decoded);

      } catch {
        localStorage.removeItem("token");
      }
    }

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
