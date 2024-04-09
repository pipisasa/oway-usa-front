import React from "react";
import s from "@/styles/components/shared/cards/ShopCard1.module.scss";
import useShops from "../../../../hooks/admin/useShops";
import ShopCard1 from "../../cards/ShopCard1";

export default function ShopsList1({ selectedCategory, selectedCountry }) {
  const { products, isLoading } = useShops(
    selectedCategory,
    selectedCountry?.id
  );

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <section className={s.cards_list}>
      {products?.results?.map((shop, index) => (
        <ShopCard1 key={index} shop={shop} />
      ))}
    </section>
  );
}
