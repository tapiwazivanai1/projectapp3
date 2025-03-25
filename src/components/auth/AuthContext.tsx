import React, { createContext, useContext, useState, useEffect } from "react";

type UserRole = "individual" | "branch" | "admin";

interface AuthUser {
  email: string;
  userName: string;
  role: UserRole;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoggedIn: boolean;
  login: (email: string, password: string, role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("auth_user");
      }
    }
  }, []);

  const login = (email: string, password: string, role: UserRole) => {
    // In a real app, this would validate credentials with a backend service
    // For now, we'll just create a user object based on the provided info
    const userName = email.split("@")[0];
    const newUser = { email, userName, role };

    // Store user in localStorage for session persistence
    localStorage.setItem("auth_user", JSON.stringify(newUser));

    setUser(newUser);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("auth_user");
    setUser(null);
    setIsLoggedIn(false);
  };

  const value = {
    user,
    isLoggedIn,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
