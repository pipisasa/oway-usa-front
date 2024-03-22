import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";
import AdminLayout from "../admin/AdminLayout";
import UsersLayout from "../users/UserLayout";

export default function Layout({ children }) {
  const router = useRouter();
  const path = router.pathname;

  const isAdminPage = path.startsWith("/admin");

  const isAuthPage = path.startsWith("/auth");

  const isUserPage = path.startsWith("/user");

  if (isAdminPage) {
    return <AdminLayout>{children}</AdminLayout>;
  }

  if (isUserPage) {
    return <UsersLayout>{children}</UsersLayout>;
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
