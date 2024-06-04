import React, { useState } from "react";
import CountryTabs from "@/components/shared/admin/catalog/CountryTabs";
import ShopsCategory from "@/components/shared/admin/catalog/ShopsCategory";
import ShopsList from "@/components/shared/admin/catalog/ShopsList";
import s from "@/styles/pages/admin/AdminShops.module.scss";
import PagesTabs from "@/components/shared/admin/catalog/PagesTabs";

export default function AdminShopsPage() {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  return (
    <div>
      <PagesTabs />
      <CountryTabs
        setSelectedCountry={setSelectedCountry}
        setSelectedCategory={setSelectedCategory}
      />
      <section className={s.shops_block}>
        <ShopsCategory
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <ShopsList
          selectedCategory={selectedCategory}
          selectedCountry={selectedCountry}
        />
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const token = req.cookies.accessToken;

  if (!token) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return { props: {} };
}
