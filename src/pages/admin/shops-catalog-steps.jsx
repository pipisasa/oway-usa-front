import React, { useState } from "react";
import CountryTabs from "@/components/shared/admin/catalog/CountryTabs";
import ShopsCategory from "@/components/shared/admin/catalog/ShopsCategory";
import ShopsList from "@/components/shared/admin/catalog/ShopsList";
import s from "@/styles/pages/admin/AdminShops.module.scss";
import ShopsCategory1 from "@/components/shared/admin/catalog/ShopsCategory1";
import ShopsList1 from "@/components/shared/admin/catalog/ShopsList1";

export default function AdminShopsSteps1() {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  return (
    <div>
      <CountryTabs setSelectedCountry={setSelectedCountry} setSelectedCategory={setSelectedCategory} />
      <section className={s.shops_block}>
        <ShopsCategory1 selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <ShopsList1 selectedCategory={selectedCategory} selectedCountry={selectedCountry}/>
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
