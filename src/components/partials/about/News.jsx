import React from "react";
import s from "@/styles/partials/News.module.scss";

export default function News() {
  return (
    <section className={`${s.news_contrainer} container`}>
      <div className={s.news_card}>
        <img src="/assets/icons/check.svg" alt="icons" />
        <p>Обновлено в этот день</p>
        <span>03.22.2023</span>
      </div>
      <div className={s.line}></div>
      <div className={s.news_card}>
        <img src="/assets/icons/locations.svg" alt="icons" />
        <p>Груз от 15 March прибыл в г. бишкек, КР</p>
      </div>
      <div className={s.line}></div>
      <div className={s.news_card}>
        <img src="/assets/icons/next-parcels.svg" alt="icons" />
        <p>Следующая посылка</p>
        <span>03.22.2023</span>
      </div>
      <div className={s.line}></div>
      <div className={s.news_card}>
        <img src="/assets/icons/admin-icons/склад.svg" alt="icons" />
        <p>Сбор посылок</p>
        <span>03.22.2023</span>
      </div>
    </section>
  );
}
