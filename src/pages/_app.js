import { useEffect, useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import Layout from "@/components/layout/Layout";
import AOS from "aos";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import "aos/dist/aos.css";
import "@/styles/globals.scss";

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    AOS.init({
      offset: 100,
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NextUIProvider>
    </QueryClientProvider>
  );
}
