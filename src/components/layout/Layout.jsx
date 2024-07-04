import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";
import AdminLayout from "../shared/admin/AdminLayout";
import UsersLayout from "../shared/users/UserLayout";
import UserMobileHeader from "../shared/users/UserMobileHeader";
import AdminMobileHeader from "../shared/admin/AdminMobileHeader";
import useLogin from "@/hooks/auth/useLogin";
import { getCookie } from "@/utils/cookieHelpers";

export default function Layout({ children }) {
  const router = useRouter();
  const path = router.pathname;

  const [isMobile, setIsMobile] = useState(false);
  const [isMobileAdmin, setIsMobileAdmin] = useState(false);
  const { refreshAccessToken } = useLogin();

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = getCookie("accessToken");
      if (!accessToken) {
        await refreshAccessToken();
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      setIsMobile(currentWidth <= 888);
      setIsMobileAdmin(currentWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isAdminPage = path.startsWith("/admin");
  const isUserPage = path.startsWith("/user");
  const isAuthPage = path.startsWith("/auth");

  if (isAdminPage) {
    return isMobileAdmin ? (
      <AdminMobileHeader>{children}</AdminMobileHeader>
    ) : (
      <AdminLayout>{children}</AdminLayout>
    );
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
    <main className="ebat">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
