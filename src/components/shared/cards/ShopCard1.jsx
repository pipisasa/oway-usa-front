import React from "react";
import s from "@/styles/components/shared/cards/ShopCard1.module.scss";
import Link from "next/link";
import { API_URL } from "@/constants";

export default function ShopCard1({ shop }) {
  return (
    <div
      className={s.card}
      data-aos="fade-left"
      data-aos-offset="300"
      data-aos-easing="ease-in-sine"
    >
      <div className={s.cards_img}>
        <img src={`${API_URL}/${shop?.logo}`} alt={shop.name} />
      </div>
      <div className={s.card_text}>
        <Link target={shop?.url ? "_blank" : ""} href={shop?.url || ""}>
          <h2>{shop.name}</h2>
        </Link>
        <p>{shop.description}</p>
      </div>
    </div>
  );
}
