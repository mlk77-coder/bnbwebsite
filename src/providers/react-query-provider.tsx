"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

/**
 * ReactQueryProvider component that wraps its children with the QueryClientProvider from react-query.
 * This ensures that the query client is available to all components for data fetching and caching.
 *
 * @param {object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the QueryClientProvider.
 * @returns {JSX.Element} The QueryClientProvider component wrapping its children with an instantiated QueryClient.
 *
 * @example
 * ```tsx
 * <ReactQueryProvider>
 *   <App />
 * </ReactQueryProvider>
 * ```
 */
const ReactQueryProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  // Create a new QueryClient instance using useState to ensure it's created only once.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
