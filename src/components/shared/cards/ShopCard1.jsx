import React from "react";
import s from "@/styles/components/shared/cards/ShopCard1.module.scss";
import Link from "next/link";

export default function ShopCard1({ shop }) {
    return (

        <div className={s.card}>
            <div className={s.cards_img}>
                <img src={`http://18.222.184.72:8000/${shop?.logo}`} alt={shop.name} />
            </div>
            <div className={s.card_text}>
                <Link target={shop?.url ? "_blank" : ''} href={shop?.url || ""}>
                     <h2>{shop.name}</h2>
                </Link>
                <p>{shop.description}</p>
            </div>
        </div>

    );
}