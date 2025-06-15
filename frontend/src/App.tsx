import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "@/ui/Header.tsx";
import { AuthProvider } from "@/features/auth/AuthContext.tsx";
import Polyglot from "@/features/main/Polyglot.tsx"

const qc = new QueryClient();

export default function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={qc}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Polyglot/>} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  );
}
