import React from "react";
import s from "@/styles/screens/main/Markets.module.scss";

export default function Markets() {
    return (
        <div className={s.heroSection_page}>
            <div className={`${s.heroSection_page} container`}>
                <div className={s.heroSection_info}>
                    <h1>Покупайте на <strong>Amazon/TrendYol</strong> <br/>
                        Получайте в <strong>странах СНГ</strong></h1>
                    <div className={s.heroSection_info_span}>
                        <span><strong>Amazon</strong> — американская компания, крупнейшая в мире на рынках платформ электронной коммерции и публично-облачных вычислений по выручке и рыночной капитализации.</span>
                    </div>

                    <button className={s.button}>Посетить сайт</button>
                </div>
                <div>
                    <img src="" alt=""/>
                </div>
            </div>
        </div>
    );
}
