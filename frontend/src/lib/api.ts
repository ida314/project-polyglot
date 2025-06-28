import axios from "axios";

// Allow overriding the API base URL via environment variable
// but default to the local backend when undefined
const baseURL = import.meta.env.VITE_API_BASE_URL || "/api";

export const api = axios.create({
  baseURL,
  withCredentials: true,               // ⇐ sends the refresh cookie
});

// Optional: Axios response typing helpers
export interface ChatRequest { message: string }
export interface ChatResponse { answer: string }
export interface ReviewResponse { answer: string }

export const chat = (data: ChatRequest) =>
  api.post<ChatResponse>("/api/chat/", data).then(r => r.data);

export const getReview = () =>
  api.post<ReviewResponse>("/api/review/").then(r => r.data);
