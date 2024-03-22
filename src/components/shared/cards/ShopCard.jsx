import React from "react";
import s from "@/styles/components/shared/cards/ShopCard.module.scss";

export default function ShopCard() {
  return (
    <div className={s.card}>
      <div className={s.cards_img}>
        <img src="" alt="" />
      </div>
      <div className={s.card_text}>
        <h2>Amazon</h2>
        <p>Огромный ассортимент, низкие цены, с частыми скидками, простые</p>
      </div>
    </div>
  );
}
