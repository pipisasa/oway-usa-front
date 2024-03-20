import Layout from "@/components/layout/Layout";
import "@/styles/globals.scss";
import { NextUIProvider } from "@nextui-org/react";

export default function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NextUIProvider>
  );
}
