"use client";

import {
  environmentManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
};

let browserQueryClient: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (environmentManager.isServer()) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
};

const QueryProviderComponent = (props: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
};

export default QueryProviderComponent;
