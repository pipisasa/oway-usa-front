import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const location = useRouter();
  const path = location.pathname;

  const showHeaderAndFooter =
    !path.startsWith("/admin") && !path.startsWith("/auth");

  return (
    <>
      {showHeaderAndFooter && <Header />}
      <main>{children}</main>
      {showHeaderAndFooter && <Footer />}
    </>
  );
}
