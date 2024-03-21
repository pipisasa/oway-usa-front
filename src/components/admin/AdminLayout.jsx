import React from "react";
import s from "@/styles/admin/AdminLayout.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import AdminHeader from "./AdminHeader";

export default function AdminLayout({ children }) {
  const router = useRouter();

  const isActive = (path) => router.pathname === path;

  const links = [
    { href: "/admin", label: "Главная" },
    { href: "/admin/users", label: "Пользователи" },
    { href: "/admin/notifications", label: "Уведомления" },
    { href: "/admin/products", label: "Товары" },
    { href: "/admin/warehouses", label: "Управление складами" },
    { href: "/admin/shops-catalog", label: "Каталог сайтов" },
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
                    {link.label}
                  </li>
                </Link>
              ))}
            </ul>
          </nav>
        </div>

        <div className={s.admin_pages}>
          <AdminHeader />
          <main>{children}</main>
        </div>
      </div>
    </>
  );
}
