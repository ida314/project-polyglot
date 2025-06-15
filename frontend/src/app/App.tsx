import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "@/pages/Search";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}
