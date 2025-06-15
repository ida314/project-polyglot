import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "@/ui/Header.tsx";
import ChatPage from "@/features/chat/ChatPage.tsx";
import ReviewPage from "@/features/review/ReviewPage.tsx";
import { AuthProvider } from "@/features/auth/AuthContext.tsx";

const qc = new QueryClient();

export default function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={qc}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<ChatPage />} />
            // <Route path="/review" element={<ReviewPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  );
}
