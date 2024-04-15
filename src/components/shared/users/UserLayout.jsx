import React from "react";
import s from "@/styles/admin/AdminLayout.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import UsersHeader from "./UserHeader";
import useLogout from "@/hooks/auth/useLogout";

export default function UsersLayout({ children }) {
  const router = useRouter();
  const logout = useLogout();
  const isActive = (path) => router.pathname === path;

  const links = [
    {
      href: "/user",
      label: "Главная",
      icons: "/assets/icons/user-icons/главная.svg",
    },
    {
      href: "/user/biling",
      label: "Оплата",
      icons: "/assets/icons/user-icons/biling.svg",
    },
    {
      href: "/user/notifications",
      label: "Уведомления",
      icons: "/assets/icons/user-icons/уведомления.svg",
    },
    {
      href: "/user/warehouses",
      label: "Адреса складов",
      icons: "/assets/icons/user-icons/склад.svg",
    },
    {
      href: "/user/tracking",
      label: "Отслеживание доставки",
      icons: "/assets/icons/user-icons/доставка.svg",
    },
    {
      href: "/user/settings",
      label: "Настройки",
      icons: "/assets/icons/user-icons/настройки.svg",
    },
    {
      href: "/user/my-parcels",
      label: "Мои посылки",
      icons: "/assets/icons/user-icons/склад.svg",
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
                      src={link.icons}
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
          <UsersHeader />
          <main>{children}</main>
        </div>
      </div>
    </>
  );
}
