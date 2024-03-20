import React from "react";
import s from "@/styles/admin/AdminLayout.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { Avatar, Badge, Button } from "@nextui-org/react";
import { NotificationIcon } from "./NotificationIcon";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const isActive = (path) => router.pathname === path;

  const links = [
    { href: "/admin", label: "Главная" },
    { href: "/admin/users", label: "Пользователи" },
    { href: "/admin/notifications", label: "Уведомления" },
    { href: "/admin/products", label: "Товары" },
    { href: "/admin/warehouses", label: "Управление складами" },
    { href: "/admin/shops-catalog", label: "Каталог сайтов" },
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
                    {link.label}
                  </li>
                </Link>
              ))}
            </ul>
          </nav>
        </div>

        <div className={s.admin_pages}>
          <header className={s.header}>
            <h3>
              Здравствуйте, <span>(Имя)</span> 👋
            </h3>

            <div className={s.notification}>
              <Badge content="13" shape="circle" color="danger">
                <Button
                  radius="full"
                  isIconOnly
                  aria-label="more than 99 notifications"
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
          <main>{children}</main>
        </div>
      </div>
    </>
  );
}
