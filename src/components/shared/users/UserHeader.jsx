import React from "react";
import s from "@/styles/admin/AdminLayout.module.scss";
import { useRouter } from "next/router";
import { Avatar, Badge, Button } from "@nextui-org/react";
import { NotificationIcon } from "../admin/NotificationIcon";
import NotificationsModal from "../admin/modals/NotificationsModal";
import AddShopsModal from "../admin/modals/AddShopsModal";
import BankCardsModal from "./modals/BankCardsModal";

export default function UsersHeader() {
  const router = useRouter();

  const links = [
    { href: "/user", label: "Главная" },
    { href: "/user/biling", label: "Билинг" },
    { href: "/user/notifications", label: "Уведомления" },
    { href: "/user/warehouses", label: "Адерса складов" },
    { href: "/user/tracking", label: "Отслеживание доставки" },
    { href: "/user/settings", label: "Настройки" },
  ];

  const getPageHeader = () => {
    if (router.pathname === "/user") {
      return (
        <>
          Здравствуйте, <span>Акбар</span> 👋
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
    }
    return null;
  };

  return (
    <header className={s.header}>
      <h3>{getPageHeader()}</h3>

      <div className={s.notification}>
        <div>{renderModal()}</div>
        <Badge content="13" shape="circle" color="danger">
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
          <span>#AIBALOH</span>
        </div>

        <Avatar
          isBordered
          radius="sm"
          src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
        />
      </div>
    </header>
  );
}
