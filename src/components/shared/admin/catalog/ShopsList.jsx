import ShopCard from "@/components/shared/cards/ShopCard";
import React from "react";
import s from "@/styles/components/shared/cards/ShopCard.module.scss";

export default function ShopsList() {
  return (
    <section className={s.cards_list}>
      <ShopCard />
      <ShopCard />
      <ShopCard />
      <ShopCard />
      <ShopCard />
      <ShopCard />
      <ShopCard />
      <ShopCard />
    </section>
  );
}
