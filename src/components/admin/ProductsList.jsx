import React from "react";
import ProductsCard from "../shared/cards/ProductsCard";
import s from "@/styles/components/shared/cards/ProdustCard.module.scss";

export default function ProductsList() {
  return (
    <section className={s.products_list}>
      <ProductsCard />
      <ProductsCard />
      <ProductsCard />
      <ProductsCard />
    </section>
  );
}
