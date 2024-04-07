import React, { useState } from "react";
import s from "@/styles/users/UserMobileHeaeder.module.scss";
import { Avatar, Badge, Button } from "@nextui-org/react";
import useNotification from "@/hooks/admin/useNotification";
import { NotificationIcon } from "../admin/NotificationIcon";
import { useRouter } from "next/router";
import useUserData from "@/hooks/user/useUserData";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import useLogout from "@/hooks/auth/useLogout";

export default function UserMobileHeader({ children }) {
  const { products } = useNotification();
  const router = useRouter();
  const { userData, loading, error } = useUserData();
  const logout = useLogout();
  const isActive = (path) => router.pathname === path;
  const [isNavOpen, setIsNavOpen] = useState(false);

  if (error) return <div className={s.header}>Error: {error}</div>;

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  const links = [
    {
      href: "/user",
      label: "Главная",
      icons: "/assets/icons/user-icons/главная.svg",
    },
    {
      href: "/user/biling",
      label: "Билинг",
      icons: "/assets/icons/user-icons/biling.svg",
    },
    {
      href: "/user/notifications",
      label: "Уведомления",
      icons: "/assets/icons/user-icons/уведомления.svg",
    },
    {
      href: "/user/warehouses",
      label: "Адерса складов",
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
  ];

  return (
    <div className={s.container}>
      <div className={s.header_container}>
        <header>
          <img src="/assets/icons/logo.svg" alt="" />
          <div>
            <Badge
              content={products?.total_not_checked_notifications}
              shape="circle"
              color="danger"
            >
              <Button
                radius="full"
                isIconOnly
                aria-label="13 notifications"
                variant="light"
                onClick={() => router.push("/user/notifications")}
              >
                <NotificationIcon size={24} />
              </Button>
            </Badge>
            <div className={s.user_code}>
              <span>#{loading ? "загрузка..." : userData?.unique_id}</span>
            </div>
            <div>
              <button onClick={toggleNav}>
                {isNavOpen ? (
                  <RxCross2 size={25} />
                ) : (
                  <RxHamburgerMenu size={25} />
                )}
              </button>
            </div>
          </div>
        </header>
        {isNavOpen ? (
          <nav className={s.nav}>
            <ul>
              {links.map((link) => (
                <li
                  className={isActive(link.href) ? s.active : ""}
                  key={link.href}
                >
                  <img
                    className={isActive(link.href) ? s.active_icon : ""}
                    src={link.icons}
                    alt=""
                  />
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>

      <main>{children}</main>
    </div>
  );
}
