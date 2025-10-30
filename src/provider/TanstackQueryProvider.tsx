import React from "react";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24,
      refetchOnMount: true,
      refetchOnReconnect: true,
      retry: false,
    },
  },
});
const persister = createSyncStoragePersister({
  storage: typeof window !== "undefined" ? window.localStorage : undefined,
});
interface Props {
  children: React.ReactNode;
}
export default function TanstackQueryProvider(props: Props) {
  const { children } = props;
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        dehydrateOptions: {
          shouldDehydrateQuery: (query) => query.queryKey.includes("persist"),
        },
      }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
