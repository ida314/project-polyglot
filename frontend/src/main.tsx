// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/features/auth/AuthContext";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  //<StrictMode>
    //{/* Google script + context are loaded once at the very top */}
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID!}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
  //</StrictMode>,
);