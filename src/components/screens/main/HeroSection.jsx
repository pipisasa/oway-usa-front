import React from "react";
import s from "@/styles/screens/main/HeroSection.module.scss";

export default function HeroSection() {
  return (
    <div className={s.heroSection_page}>
        <div className={`${s.heroSection_page} container`}>
            <div className={s.heroSection_info}>
                <h1>OWAY USA: ваш мост к мировым покупкам</h1>
                <div className={s.heroSection_info_span}>
                    <div></div>
                    <span>Легко, надежно и выгодно доставляем товары из зарубежных <br/> интернет-магазинов прямо к вам домой</span>
                </div>
                <button className={s.button}>Закупиться</button>
            </div>
            <div>
                <img src="" alt=""/>
            </div>
        </div>
    </div>
  );
}
