// src/features/auth/LoginButton.tsx
import { GoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { api } from "@/lib/api";
import { useAuth } from "@/features/auth/AuthContext";

type Size = "sm" | "lg";

export default function LoginButton({ size = "sm" }: { size?: Size }) {
  const { accessToken, setAccessToken, logout } = useAuth();   // ← expose setter in AuthContext

  const base =
    "flex items-center gap-3 rounded-md transition focus-visible:outline-none";
  const variants = {
    sm: "px-4 py-2 border border-zinc-300 bg-white text-sm font-medium hover:bg-zinc-50",
    lg: "px-6 py-3 bg-blue-600 text-white text-lg shadow hover:bg-blue-700",
  };

  /* ───────────── signed-in view ───────────── */
  if (accessToken) {
    return (
      <button
        onClick={logout}
        className={`${base} ${variants[size]} bg-zinc-800 text-white hover:bg-zinc-700`}
      >
        Sign out
      </button>
    );
  }

  /* ───────────── sign-in view ───────────── */
  return (
    <GoogleLogin
      ux_mode="popup"               // keeps SPA routing intact
      type="standard"               // Google's required styling; we wrap it
      shape="pill"
      text="signin_with"
      theme="outline"
      /* Custom-render the button so the UI matches the rest of the site */
      render={(renderProps) => (
        <button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          className={`${base} ${variants[size]}`}
        >
          <FcGoogle className={size === "lg" ? "text-2xl" : "text-xl"} />
          <span>Sign in with Google</span>
        </button>
      )}
      onSuccess={async (cred) => {
        // cred.credential is the Google-signed ID token (JWT)
        try {
          const { data } = await api.post<{ access_token: string }>("/api/auth", {
            token: cred.credential,
          });
          setAccessToken(data.access_token);   // flips UI → Chat
        } catch (err) {
          console.error("/api/auth failed:", err);
        }
      }}
      onError={() => console.error("Google login failed")}
    />
  );
}
