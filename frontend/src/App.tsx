import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PerplexityClone from "@/components/PerplexityClone";

const client = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30_000, refetchOnWindowFocus: false },
  },
});

function App() {
  return (
    <QueryClientProvider client={client}>
      <PerplexityClone />
    </QueryClientProvider>
  );
}
