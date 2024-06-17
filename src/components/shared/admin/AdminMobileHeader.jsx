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
import NotificationsModal from "./modals/NotificationsModal";
import AddShopsModal from "./modals/AddShopsModal";
import WarehouseProductsModal from "./modals/WarehousesProductsModal";
import CompaniesModal from "./modals/CompaniesModal";
import AddParcelsAdmin from "./modals/AddParcelsAdmin";
import AddUsersModal from "./modals/AddUsersModal";
import ProductsModal from "./modals/ProductsModal";

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
      label: "Запрос на выкуп",
      icons: "/assets/icons/admin-icons/requests.svg",
    },
    {
      href: "/admin/catalog",
      label: "Каталог",
      icons: "/assets/icons/admin-icons/сайты.svg",
    },
    {
      href: "/admin/user-parcels",
      label: "Ожидаемые посылки",
      icons: "/assets/icons/admin-icons/поссылки.svg",
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

  const renderModal = () => {
    if (router.pathname === "/admin/users") {
      return <AddUsersModal />;
    } else if (router.pathname === "/admin/notifications") {
      return <NotificationsModal />;
    } else if (router.pathname === "/admin/catalog") {
      return <AddShopsModal />;
    } else if (router.pathname === "/admin/catalog/products") {
      return <ProductsModal />;
    } else if (router.pathname.includes("/admin/warehouses/")) {
      return <WarehouseProductsModal />;
    } else if (router.pathname === "/admin/catalog/companies") {
      return <CompaniesModal />;
    } else if (router.pathname.includes("/admin/user-parcels")) {
      return <AddParcelsAdmin />;
    }
    return null;
  };

  return (
    <div className={s.container}>
      <div className={s.header_container}>
        <header>
          <Link href="/">
            <img className={s.logo} src="/assets/icons/logo.svg" alt="" />
          </Link>
          <button onClick={() => router.push("/user")} className={s.btn}>
            Личный кабинет
          </button>
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

      <div className={s.modals}>{renderModal()}</div>
    </div>
  );
}
