"use client";

import React, { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
  role: string;
  status: string;
  jobTitle?: string | null;
  location?: string | null;
  profileImage?: string | null;
  profileImagePublicId?: string | null;
  lastLogin?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const response = await fetch("/api/auth/me", {
        credentials: "include",
        cache: "no-store",
      });

      if (!response.ok) {
        setUser(null);
        return;
      }

      const payload = await response.json();
      setUser(payload.user ?? null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || "Login failed");
    }

    setUser(payload.user);
    return payload.user as User;
  };

  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      logout,
      refreshUser,
    }),
    [user, loading]
  );

  return React.createElement(AuthContext.Provider, { value }, children);
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
