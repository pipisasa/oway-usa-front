import React, { useState } from "react";
import s from "@/styles/users/UserMobileHeaeder.module.scss";
import { Badge, Button } from "@nextui-org/react";
import useNotification from "@/hooks/admin/useNotification";
import { NotificationIcon } from "../admin/NotificationIcon";
import { useRouter } from "next/router";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import useLogout from "@/hooks/auth/useLogout";
import ModalUserMobil from "@/components/partials/ModalUserMobil";

export default function AdminMobileHeader({ children }) {
  const { products } = useNotification();
  const router = useRouter();
  const logout = useLogout();
  const isActive = (path) => router.pathname === path;
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  const links = [
    {
      href: "/admin",
      label: "Главная",
      icons: "/assets/icons/admin-icons/главная.svg",
    },
    {
      href: "/admin/users",
      label: "Пользователи",
      icons: "/assets/icons/admin-icons/пользователи.svg",
    },
    {
      href: "/admin/notifications",
      label: "Уведомления",
      icons: "/assets/icons/admin-icons/уведомления.svg",
    },
    {
      href: "/admin/warehouses",
      label: "Склады",
      icons: "/assets/icons/admin-icons/склад.svg",
    },
    {
      href: "/admin/requests",
      label: "Входящие запросы",
      icons: "/assets/icons/admin-icons/requests.svg",
    },
    {
      href: "/admin/catalog/shops-catalog",
      label: "Каталог",
      icons: "/assets/icons/admin-icons/сайты.svg",
    },
    {
      href: "/admin/user-parcels",
      label: "Ожидаемые посылки",
      icons: "/assets/icons/calc_icon.svg",
    },
    {
      href: "/admin/illinois",
      label: "Клиенты за Иллинойс",
      icons: "/assets/icons/united-states-of-america.svg",
    },
    {
      href: "/admin/bulletin-board",
      label: "Доска объявлений",
      icons: "/assets/icons/admin-icons/bulletin_board.svg",
    },
  ];

  return (
    <div className={s.container}>
      <div className={s.header_container}>
        <header>
          <Link href="/">
            <img src="/assets/icons/logo.svg" alt="" />
          </Link>

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
        <div className={`${s.nav} ${isNavOpen ? s.visibleFilter : ""}`}>
          <div className={`${s.filterComponentContainer}`}>
            <ModalUserMobil
              links={links}
              isActive={isActive}
              logout={logout}
              toggleNav={toggleNav}
            />
          </div>
        </div>
      </div>

      <main className={s.pages_container}>{children}</main>
    </div>
  );
}
