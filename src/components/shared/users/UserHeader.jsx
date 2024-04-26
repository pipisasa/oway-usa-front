import React, { useEffect, useState } from "react";
import s from "@/styles/admin/AdminLayout.module.scss";
import { useRouter } from "next/router";
import { Badge, Button } from "@nextui-org/react";
import { NotificationIcon } from "../admin/NotificationIcon";
import NotificationsModal from "../admin/modals/NotificationsModal";
import AddShopsModal from "../admin/modals/AddShopsModal";
import BankCardsModal from "./modals/BankCardsModal";
import useUserData from "@/hooks/user/useUserData";
import useNotification from "../../../hooks/user/useNotification";
import MyWarehousesModal from "../admin/modals/MyWarehousesModal";
import Link from "next/link";
import { getCookie } from "@/utils/cookieHelpers";

export default function UsersHeader() {
  const router = useRouter();
  const { userData, loading, error } = useUserData();
  const { products } = useNotification();

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminStatus = getCookie("isAdmin") === "true";
    setIsAdmin(adminStatus);
  }, []);

  const links = [
    { href: "/user", label: "Главная" },
    { href: "/user/biling", label: "Оплата" },
    { href: "/user/calculator", label: "Калькулятор" },
    { href: "/user/notifications", label: "Уведомления" },
    { href: "/user/warehouses", label: "Адреса складов" },
    { href: "/user/tracking", label: "Отслеживание доставки" },
    { href: "/user/settings", label: "Настройки" },
    { href: "/user/my-parcels", label: "Мои посылки" },
  ];

  const getPageHeader = () => {
    if (router.pathname === "/user") {
      return (
        <>
          Здравствуйте,{" "}
          <span>{loading ? "загрузка..." : userData?.first_name}</span> 👋
        </>
      );
    } else {
      const currentPage = links.find((link) => router.pathname === link.href);
      return currentPage ? currentPage.label : "Название страницы не найдено";
    }
  };

  const renderModal = () => {
    if (router.pathname === "/user/biling") {
      return <BankCardsModal />;
    } else if (router.pathname === "/admin/notifications") {
      return <NotificationsModal />;
    } else if (router.pathname === "/admin/shops-catalog") {
      return <AddShopsModal />;
    } else if (router.pathname === "/user/my-parcels") {
      return <MyWarehousesModal />;
    }
    return null;
  };

  if (error) return <div className={s.header}>Error: {error}</div>;

  return (
    <header className={s.header}>
      <h3>{getPageHeader()}</h3>

      <div className={s.notification}>
        <div>{renderModal()}</div>
        {isAdmin && (
          <button onClick={() => router.push("/admin")} className={s.btn}>
            Админ панель
          </button>
        )}

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
      </div>
    </header>
  );
}
