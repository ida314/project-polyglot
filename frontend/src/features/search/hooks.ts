import { useMutation } from "@tanstack/react-query";
import { ask, AskRequest, AskResponse } from "@/api";

export const useAsk = () =>
  useMutation<AskResponse, Error, AskRequest>({
    mutationFn: ask,
    retry: 1,                     // ⤴︎ sensible default – tune per endpoint
  });
