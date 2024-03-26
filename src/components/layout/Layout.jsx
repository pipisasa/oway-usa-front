import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";
import AdminLayout from "../shared/admin/AdminLayout";
import UsersLayout from "../shared/users/UserLayout";

export default function Layout({ children }) {
  const router = useRouter();
  const path = router.pathname;

  const isAdminPage = path.startsWith("/admin");
  const isUserPage = path.startsWith("/user");
  const isAuthPage = path.startsWith("/auth");
  const isHomePage = path === "/";

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
      {!isHomePage && <Header />}
      <main>{children}</main>
      <Footer />
    </>
  );
}
