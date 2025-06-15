// src/features/auth/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { googleLogout } from "@react-oauth/google";
import { api } from "@/lib/api";

/* 1 ────────────────────────  Context shape  */
interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
}

const AuthCtx = createContext<AuthState | null>(null);
export const useAuth = () => useContext(AuthCtx)!;

/* 2 ────────────────────────  Provider  */
export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    () => localStorage.getItem("access_token") ?? null,
  );

  /* Sync token → axios + localStorage */
  useEffect(() => {
    if (accessToken) {
      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      localStorage.setItem("access_token", accessToken);
    } else {
      delete api.defaults.headers.common.Authorization;
      localStorage.removeItem("access_token");
    }
  }, [accessToken]);

  /* Optional: auto-refresh on 401 */
  useEffect(() => {
    const id = api.interceptors.response.use(
      (r) => r,
      async (err) => {
        const original = err.config;
        if (err.response?.status === 401 && !original._retry) {
          original._retry = true;
          try {
            const { data } = await api.post<{ access_token: string }>("/api/auth/refresh");
            setAccessToken(data.access_token);
            return api(original);
          } catch {
            setAccessToken(null);
          }
        }
        return Promise.reject(err);
      },
    );
    return () => api.interceptors.response.eject(id);
  }, []);

  /* Basic logout helper */
  const logout = () => {
    googleLogout();          // revoke Google session (optional)
    setAccessToken(null);
  };

  return (
    <AuthCtx.Provider value={{ accessToken, setAccessToken, logout }}>
      {children}
    </AuthCtx.Provider>
  );
};
