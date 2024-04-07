import React from "react";
import s from "@/styles/components/shared/cards/ShopCard.module.scss";
import Link from "next/link";

export default function ShopCard({ shop, onEdit, onDelete }) {
    const handleEditClick = (id) => {
            onEdit(id);
    };
    const handleDelete = (id) => {
        onDelete(id);

    };

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
            <div className={s.card_btn}>
                <button className={s.card_button} onClick={() => handleEditClick(shop?.id)}>
                    <img src="/assets/icons/edit.svg" alt=""/>
                </button>
                <button onClick={() => handleDelete(shop?.id)}>
                    <img src="/assets/icons/delete.svg" alt=""/>
                </button>
            </div>
        </div>

    );
}