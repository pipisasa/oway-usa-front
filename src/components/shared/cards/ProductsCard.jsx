import React from "react";
import s from "@/styles/components/shared/cards/ProdustCard.module.scss";

export default function ProductsCard() {
  return (
    <div className={s.card_block}>
      <div className={s.card_img}></div>
      <div className={s.card_text}>
        <h2>Название товара</h2>
        <p>https://www.apple.com/</p>
      </div>
    </div>
  );
}
