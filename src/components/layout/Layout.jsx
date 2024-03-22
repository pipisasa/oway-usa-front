import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";
import AdminLayout from "../admin/AdminLayout";

export default function Layout({ children }) {
  const router = useRouter();
  const path = router.pathname;

  const isAdminPage = path.startsWith("/admin");

  const isAuthPage = path.startsWith("/auth");

  if (isAdminPage) {
    return <AdminLayout>{children}</AdminLayout>;
  }

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
