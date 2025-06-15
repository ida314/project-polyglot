import { useMutation } from "@tanstack/react-query";
import { ask } from "../api/ask";

export function useAsk() {
  return useMutation({
    mutationFn: (payload: { query: string }) => ask(payload.query),
  });
}
