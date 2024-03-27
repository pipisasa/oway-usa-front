import React from "react";
import s from "@/styles/partials/Button.module.scss";
export default function Button({button}) {

    return (
        <button className={s.button}>
            <span>{button}</span>
            <img src="/assets/icons/rightIcon.svg" alt="logo"/>
        </button>
    )
}
