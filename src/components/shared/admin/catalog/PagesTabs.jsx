import React from "react";
import { useRouter } from "next/router";
import s from "@/styles/admin/PagesTabs.module.scss";

export default function PagesTabs() {
  const router = useRouter();
  const { pathname } = router;

  const handleTabClick = (path) => {
    router.push(path);
  };

  return (
    <div className={s.tabs}>
      <button
        className={pathname === "/admin/catalog/shops-catalog" ? s.active : ""}
        onClick={() => handleTabClick("/admin/catalog/shops-catalog")}
      >
        Каталог сайтов
      </button>
      <button
        className={pathname === "/admin/catalog/companies" ? s.active : ""}
        onClick={() => handleTabClick("/admin/catalog/companies")}
      >
        Логотипы компаний
      </button>
      <button
        className={pathname === "/admin/catalog/products" ? s.active : ""}
        onClick={() => handleTabClick("/admin/catalog/products")}
      >
        Горячие предложения
      </button>
    </div>
  );
}
