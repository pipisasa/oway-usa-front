import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import s from "@/styles/components/shared/bread/Bread.module.scss";

const pathLabelMap = {
  admin: {
    label: "",
    href: "/admin",
  },
  warehouses: {
    label: "Управление складами",
    href: "/admin/warehouses",
  },
  catalog: {
    label: "Каталог сайтов",
    href: "/catalog",
  },
  companies: {
    label: "Логотипы компаний",
    href: "/companies",
  },
  products: {
    label: "Товары",
    href: "/products",
  },
};

const warehouses = [
  { id: 7, name: "Турция" },
  { id: 8, name: "Москва" },
  { id: 9, name: "Кыргызстан" },
  { id: 14, name: "Чикаго" },
];

const Breadcrumbs = () => {
  const router = useRouter();
  const { asPath } = router;

  const generateBreadcrumbs = () => {
    const pathParts = asPath.split("/").filter((part) => part);

    return pathParts.map((part, index) => {
      const pathSegment = decodeURIComponent(part);
      const breadcrumb = pathLabelMap[pathSegment];
      const isLast = index === pathParts.length - 1;

      if (breadcrumb) {
        return {
          label: breadcrumb.label,
          href: breadcrumb.href,
          isLast,
        };
      } else if (index > 1 && pathParts[index - 1] === "warehouses") {
        const warehouse = warehouses.find(
          (warehouse) =>
            warehouse.name.toLowerCase() === pathSegment.toLowerCase()
        );
        if (warehouse) {
          return {
            label: warehouse.name,
            href: `/admin/warehouses/${warehouse.id}`,
            isLast,
          };
        }
      }
      return {
        label: pathSegment,
        href: `/${pathParts.slice(0, index + 1).join("/")}`,
        isLast,
      };
    });
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <nav className={s.breadcrumbs}>
      {breadcrumbs.map((breadcrumb, index) => (
        <span key={index} className={s.breadcrumbItem}>
          {index > 0 && ""}
          {breadcrumb.isLast ? (
            <p className={s.current}>{breadcrumb.label}</p>
          ) : (
            <Link href={breadcrumb.href}>
              <p>{breadcrumb.label}</p>
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;