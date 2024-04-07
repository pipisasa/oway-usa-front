import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";
import AdminLayout from "../shared/admin/AdminLayout";
import UsersLayout from "../shared/users/UserLayout";
import UserMobileHeader from "../shared/users/UserMobileHeader";

export default function Layout({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const path = router.pathname;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 888);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isAdminPage = path.startsWith("/admin");
  const isUserPage = path.startsWith("/user");
  const isAuthPage = path.startsWith("/auth");
  const isHomePage = path === "/";

  if (isAdminPage) {
    return <AdminLayout>{children}</AdminLayout>;
  }

  if (isUserPage) {
    return isMobile ? (
      <UserMobileHeader>{children}</UserMobileHeader>
    ) : (
      <UsersLayout>{children}</UsersLayout>
    );
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
