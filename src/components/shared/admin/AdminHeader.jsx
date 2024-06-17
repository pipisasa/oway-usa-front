import React from "react";
import s from "@/styles/admin/AdminLayout.module.scss";
import { useRouter } from "next/router";
import { Badge, Button } from "@nextui-org/react";
import { NotificationIcon } from "./NotificationIcon";
import AddUsersModal from "./modals/AddUsersModal";
import NotificationsModal from "./modals/NotificationsModal";
import AddShopsModal from "./modals/AddShopsModal";
import ProductsModal from "./modals/ProductsModal";
import WarehouseProductsModal from "./modals/WarehousesProductsModal";
import CompaniesModal from "./modals/CompaniesModal";
import AddParcelsAdmin from "./modals/AddParcelsAdmin";

export default function AdminHeader() {
  const router = useRouter();
  const { asPath } = router;
  const pathSegments = asPath.split("/");

  const links = [
    { href: "/admin", label: "Главная" },
    { href: "/admin/users", label: "Пользователи" },
    { href: "/admin/notifications", label: "Уведомления" },
    { href: "/admin/catalog/products", label: "Товары" },
    { href: "/admin/warehouses", label: "Управление складами" },
    { href: "/admin/requests", label: "Запрос на выкуп" },
    { href: "/admin/catalog", label: "Каталог сайтов" },
    { href: "/admin/user-parcels", label: "Ожидаемые посылки" },
    { href: "/admin/catalog/companies", label: "Логотипы компаний" },
    {
      href: "/admin/illinois",
      label: "Запросы клиентов за пределами штата Иллинойс",
    },
    {
      href: "/admin/bulletin-board",
      label: "Доска объявлений",
    },
    {
      href: "/admin/board-category",
      label: "Доска объявлений - Категории",
    },
  ];

  const getPageHeader = () => {
    if (router.pathname === "/admin") {
      return (
        <>
          Здравствуйте, <span>Администратор</span> 👋
        </>
      );
    } else if (
      router.pathname.startsWith("/admin/warehouses/") &&
      pathSegments.length >= 3
    ) {
      const warehouseName = decodeURIComponent(pathSegments[3]);
      return `Склад - ${warehouseName}`;
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
