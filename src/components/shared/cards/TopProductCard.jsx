import React from "react";
import s from "@/styles/partials/card/CurrentCard.module.scss";

export default function TopProductCard({ productName }) {
  return (
    <div className={s.card}>
      <div className={s.card_img}>
        <img src="assets/images/cakedecor.png" alt="" />
      </div>
      <p>{productName}</p>
    </div>
  );
}
