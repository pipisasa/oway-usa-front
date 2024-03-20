import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";
import AdminLayout from "../admin/AdminLayout";

export default function Layout({ children }) {
  const router = useRouter();
  const path = router.pathname;

  const isAdminPage = path.startsWith("/admin");

  if (isAdminPage) {
    return <AdminLayout>{children}</AdminLayout>;
  }

  return (
    <>
      <Header />
      <main className="container">{children}</main>
      <Footer />
    </>
  );
}
