// src/App.tsx
import { useAuth } from "@/features/auth/AuthContext";
import PolyglotApp from "@/features/main/PolyglotApp";
import LandingPage from "@/features/auth/LandingPage";

export default function App() {
  const { accessToken } = useAuth();
  return accessToken ? <PolyglotApp /> : <LandingPage />;
}
