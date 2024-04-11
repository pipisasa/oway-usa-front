import React from "react";
import s from "@/styles/admin/AdminLayout.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import AdminHeader from "./AdminHeader";
import useLogout from "@/hooks/auth/useLogout";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const logout = useLogout();

  const isActive = (path) => router.pathname === path;

  const links = [
    {
      href: "/admin",
      label: "Главная",
      icon: "/assets/icons/admin-icons/главная.svg",
    },
    {
      href: "/admin/users",
      label: "Пользователи",
      icon: "/assets/icons/admin-icons/пользователи.svg",
    },
    {
      href: "/admin/notifications",
      label: "Уведомления",
      icon: "/assets/icons/admin-icons/уведомления.svg",
    },
    {
      href: "/admin/products",
      label: "Горячие предложения",
      icon: "/assets/icons/admin-icons/товары.svg",
    },
    {
      href: "/admin/warehouses",
      label: "Управление складами",
      icon: "/assets/icons/admin-icons/склад.svg",
    },
    {
      href: "/admin/requests",
      label: "Входящие запросы",
      icon: "/assets/icons/admin-icons/requests.svg",
    },
    {
      href: "/admin/shops-catalog",
      label: "Каталог сайтов",
      icon: "/assets/icons/admin-icons/сайты.svg",
    },
  ];

  return (
    <>
      <div className={s.layout}>
        <div className={s.sidebar}>
          <div onClick={() => router.push("/")} className={s.logo}>
            <img src="/assets/icons/owayUSE.svg" alt="Oway USA" />
          </div>

          <nav>
            <ul>
              {links.map((link) => (
                <Link key={link.label} href={link.href}>
                  <li className={isActive(link.href) ? s.active : ""}>
                    <img
                      src={link.icon}
                      alt="icons"
                      className={isActive(link.href) ? s.active_icon : ""}
                    />
                    {link.label}
                  </li>
                </Link>
              ))}
              <button onClick={logout} className={s.logout}>
                <img src="/assets/icons/logout.svg" alt="logout" />
                Выйти
              </button>
            </ul>
          </nav>
        </div>

        <div className={s.admin_pages}>
          <AdminHeader />
          <main className={s.admin_page_content}>{children}</main>
        </div>
      </div>
    </>
  );
}
