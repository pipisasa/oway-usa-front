import React from "react";
import s from "@/styles/admin/AdminLayout.module.scss";
import { useRouter } from "next/router";
import { Avatar, Badge, Button } from "@nextui-org/react";
import { NotificationIcon } from "./NotificationIcon";
import AddUsersModal from "./modals/AddUsersModal";
import NotificationsModal from "./modals/NotificationsModal";
import AddShopsModal from "./modals/AddShopsModal";
import ProductsModal from "./modals/ProductsModal";
import WarehouseProductsModal from "./modals/WarehousesProductsModal";
import Link from "next/link"

export default function AdminHeader() {
  const router = useRouter();

  const links = [
    { href: "/admin", label: "Главная" },
    { href: "/admin/users", label: "Пользователи" },
    { href: "/admin/notifications", label: "Уведомления" },
    { href: "/admin/products", label: "Товары" },
    { href: "/admin/warehouses", label: "Управление складами" },
    { href: "/admin/requests", label: "Входящие запросы" },
    { href: "/admin/shops-catalog", label: "Каталог сайтов" },
    { href: "/admin/user-parcels", label: "Ожидаемые посылки" },
  ];

  const getPageHeader = () => {
    if (router.pathname === "/admin") {
      return (
        <>
          Здравствуйте, <span>Администратор</span> 👋
          <Link className={s.lk} href="/user">Личный кабинет</Link>
        </>
      );
    } else {
      const currentPage = links.find((link) => router.pathname === link.href);
      return currentPage ? currentPage.label : "Название страницы не найдено";
    }
  };

  const renderModal = () => {
    if (router.pathname === "/admin/users") {
      return <AddUsersModal />;
    } else if (router.pathname === "/admin/notifications") {
      return <NotificationsModal />;
    } else if (router.pathname === "/admin/shops-catalog") {
      return <AddShopsModal />;
    } else if (router.pathname === "/admin/products") {
      return <ProductsModal />;
    } else if (router.pathname === "/admin/warehouses") {
      return <WarehouseProductsModal />;
    }
    return null;
  };

  return (
    <header className={s.header}>
      <h3>{getPageHeader()}</h3>

      <div className={s.notification}>
        <div>{renderModal()}</div>
        <button onClick={() => router.push("/user")} className={s.btn}>
          Личный кабинет
        </button>
        <Badge shape="circle" color="danger">
          <Button
            radius="full"
            isIconOnly
            aria-label="13 notifications"
            variant="light"
            onClick={() => router.push("/admin/notifications")}
          >
            <NotificationIcon size={24} />
          </Button>
        </Badge>
      </div>
    </header>
  );
}
