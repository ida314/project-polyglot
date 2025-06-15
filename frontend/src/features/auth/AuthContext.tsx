import { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/lib/api.ts";

interface AuthState {
  accessToken: string | null;
  loginWithGoogle: () => void;
  logout: () => void;
}
const AuthCtx = createContext<AuthState | null>(null);
export const useAuth = () => useContext(AuthCtx)!;

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Send access token on every request
  useEffect(() => {
    api.defaults.headers.common.Authorization = accessToken ? `Bearer ${accessToken}` : "";
  }, [accessToken]);

  // Axios interceptor – auto-refresh on 401
  useEffect(() => {
    const id = api.interceptors.response.use(
      res => res,
      async err => {
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
      }
    );
    return () => api.interceptors.response.eject(id);
  }, []);

  const loginWithGoogle = () => {
    /* Lazy-load Google script so it doesn’t block TTI */
    import("@react-oauth/google").then(({ googleLogout, useGoogleLogin }) => {
      useGoogleLogin({
        flow: "implicit",
        onSuccess: async ({ credential }) => {
          const { data } = await api.post<{ access_token: string }>("/api/auth/", {
            token: credential,
          });
          setAccessToken(data.access_token);
        },
      })();
    });
  };

  const logout = () => {
    setAccessToken(null);
    // Optionally hit a revoke endpoint &/or clear cookie
  };

  return (
    <AuthCtx.Provider value={{ accessToken, loginWithGoogle, logout }}>
      {children}
    </AuthCtx.Provider>
  );
};
