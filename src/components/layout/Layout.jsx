import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "./Header";
import Footer from "./Footer";
import AdminLayout from "../shared/admin/AdminLayout";
import UsersLayout from "../shared/users/UserLayout";
import UserMobileHeader from "../shared/users/UserMobileHeader";
import useLogout from "@/hooks/auth/useLogout";
import AlwaysOpenModal from "@/context/Block";

export default function Layout({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const path = router.pathname;
  const logout = useLogout();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 888);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Redirect users if they are not on the home page
    if (path !== "/") {
      router.push("/");
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [path, router]);

  const isAdminPage = path.startsWith("/admin");
  const isUserPage = path.startsWith("/user");
  const isAuthPage = path.startsWith("/auth");
  const isHomePage = path === "/";

  if (isHomePage) {
    return (
      <main className="ebat">
        <Header />
        <AlwaysOpenModal />
        <main className="">{children}</main>
        <Footer />
      </main>
    );
  }

  return null;
}
