import React from "react";
import s from "@/styles/admin/AdminLayout.module.scss";
import { useRouter } from "next/router";
import { Avatar, Badge, Button } from "@nextui-org/react";
import { NotificationIcon } from "./NotificationIcon";
import AddUsersModal from "./AddUsersModal";

export default function AdminHeader() {
  const router = useRouter();

  const links = [
    { href: "/admin", label: "Главная" },
    { href: "/admin/users", label: "Пользователи" },
    { href: "/admin/notifications", label: "Уведомления" },
    { href: "/admin/products", label: "Товары" },
    { href: "/admin/warehouses", label: "Управление складами" },
    { href: "/admin/shops-catalog", label: "Каталог сайтов" },
  ];

  const getPageHeader = () => {
    if (router.pathname === "/admin") {
      return (
        <>
          Здравствуйте, <span>(Имя)</span> 👋
        </>
      );
    } else {
      const currentPage = links.find((link) => router.pathname === link.href);
      return currentPage ? currentPage.label : "Название страницы не найдено";
    }
  };

  return (
    <header className={s.header}>
      <h3>{getPageHeader()}</h3>

      <div className={s.notification}>
        <div>
          <AddUsersModal />
        </div>
        <Badge content="13" shape="circle" color="danger">
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

        <Avatar
          isBordered
          radius="sm"
          src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
        />
      </div>
    </header>
  );
}
