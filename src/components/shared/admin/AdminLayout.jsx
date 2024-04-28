import React from "react";
import s from "@/styles/admin/AdminLayout.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import AdminHeader from "./AdminHeader";
import useLogout from "@/hooks/auth/useLogout";
import { AiFillFileImage } from "react-icons/ai";

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
    {
      href: "/admin/user-parcels",
      label: "Ожидаемые посылки",
      icon: "/assets/icons/calc_icon.svg",
    },
    {
      href: "/admin/companies",
      label: "Логотипы компаний",
      icon: <AiFillFileImage          
      size={22}
      color={isActive("/user/my-requests") ? "#FFF" : "#027ddb"}/>,
    },
    {
      href: "/admin/illinois",
      label: "Клиенты за Иллинойс",
      icon: "/assets/icons/united-states-of-america.svg",
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
                  {typeof link.icon === "string" ? (
                      <img
                        src={link.icon}
                        alt="icon"
                        className={isActive(link.href) ? s.active_icon : ""}
                      />
                    ) : (
                      <span>{link.icon}</span>
                    )}
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
