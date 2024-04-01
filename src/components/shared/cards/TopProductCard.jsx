import React from "react";
import s from "@/styles/partials/card/CurrentCard.module.scss";
import Link from "next/link";

export default function TopProductCard({ title, link, image }) {
  return (
    <Link href={link} target="__blank">
      <div className={s.card}>
        <div className={s.card_img}>
          <img src={image} alt="img" />
        </div>
        <p>{title}</p>
      </div>
    </Link>
  );
}
