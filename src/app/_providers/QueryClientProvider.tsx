import { QueryClient, QueryClientProvider as RQQueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { type PropsWithChildren, useMemo } from "react";

export function QueryClientProvider({ children }: PropsWithChildren) {
  const queryClient = useMemo(() => {
    return new QueryClient();
  }, []);

  return (
    <RQQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </RQQueryClientProvider>
  );
}
