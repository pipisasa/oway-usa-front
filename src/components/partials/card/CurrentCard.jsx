import React from "react";
import s from "@/styles/partials/card/CurrentCard.module.scss";

export default function CurrentCard() {
    return (
        <div className={s.card}>
                <div className={s.card_img}>
                    <img src="assets/images/cakedecor.png" alt=""/>
                </div>
                <p>CAKEDECOR.KZ форма PS286-28, сталь</p>
        </div>
    );
}
