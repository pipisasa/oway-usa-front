import React, { useState } from "react";
import s from "@/styles/users/UserMobileHeaeder.module.scss";
import c from "@/styles/components/layout/Header.module.scss";
import { Badge, Button } from "@nextui-org/react";
import useNotification from "@/hooks/admin/useNotification";
import { NotificationIcon } from "../admin/NotificationIcon";
import { useRouter } from "next/router";
import useUserData from "@/hooks/user/useUserData";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import useLogout from "@/hooks/auth/useLogout";
import ModalUserMobil from "@/components/partials/ModalUserMobil";

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
        <div
          className={`${s.nav} ${
            isNavOpen ? s.visibleFilter : ''
          }`}
        >
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
