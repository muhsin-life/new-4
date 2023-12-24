import Layout from "@/components/Layout";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import { QueryClientProvider, QueryClient, HydrationBoundary } from "@tanstack/react-query";
import React, { useState } from "react";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});



export default function App({ Component, pageProps }: AppProps) {

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
      <main
        className={cn(
          "relative h-full antialiased flex flex-col min-h-screen",
          poppins.className
        )}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
