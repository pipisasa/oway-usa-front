import React from "react";
import CountryTabs from "@/components/admin/catalog/CountryTabs";
import ShopsCategory from "@/components/admin/catalog/ShopsCategory";
import ShopsList from "@/components/admin/catalog/ShopsList";
import s from "@/styles/pages/admin/AdminShops.module.scss";

export default function AdminShopsPage() {
  return (
    <div>
      <CountryTabs />
      <section className={s.shops_block}>
        <ShopsCategory />
        <ShopsList />
      </section>
    </div>
  );
}
