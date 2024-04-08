import Layout from "@/components/layout/Layout";
import "@/styles/globals.scss";
import { NextUIProvider } from "@nextui-org/react";
import AOS from 'aos';
import { useEffect } from "react";

// import aos styles
import 'aos/dist/aos.css';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // here you can add your aos options
    AOS.init({
      offset: 100,
    });
  }, []);
  return (
    <NextUIProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NextUIProvider>
  );
}
