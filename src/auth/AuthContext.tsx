import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import * as authApi from "../services/auth.service";

type User = authApi.MeResponse;

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshMe: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  async function refreshMe() {
    try {
      const me = await authApi.me();
      setUser(me);
    } catch {
      setUser(null);
    }
  }

  useEffect(() => {
    // ✅ при старті апки перевіряємо чи є валідна сесія (cookies)
    (async () => {
      setLoading(true);
      await refreshMe();
      setLoading(false);
    })();
  }, []);

  async function login(email: string, password: string) {
    await authApi.login({ email, password });
    await refreshMe(); // ✅ підтягнути user
  }

  async function signup(name: string, email: string, password: string) {
    await authApi.signup({ name, email, password });
    // тут не логінимо автоматом, вирішимо в SignupPage
  }

  async function logout() {
    try {
      await authApi.logout();
    } finally {
      setUser(null);
    }
  }

  const value = useMemo(
    () => ({ user, isAuthenticated, loading, login, signup, logout, refreshMe }),
    [user, isAuthenticated, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
