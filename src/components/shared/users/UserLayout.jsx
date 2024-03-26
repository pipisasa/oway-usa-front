import React from "react";
import s from "@/styles/admin/AdminLayout.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import UsersHeader from "./UserHeader";

export default function UsersLayout({ children }) {
  const router = useRouter();

  const isActive = (path) => router.pathname === path;

  const links = [
    { href: "/user", label: "Главная" },
    { href: "/user/biling", label: "Билинг" },
    { href: "/user/notifications", label: "Уведомления" },
    { href: "/user/warehouses", label: "Адерса складов" },
    { href: "/user/tracking", label: "Отслеживание доставки" },
    { href: "/user/settings", label: "Настройки" },
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
          <UsersHeader />
          <main>{children}</main>
        </div>
      </div>
    </>
  );
}
