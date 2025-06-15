import { axiosInstance } from "@/shared/api/http";

export async function ask(query: string) {
  const res = await axiosInstance.post("/chat", { query });
  return res.data as { answer: string };
}
