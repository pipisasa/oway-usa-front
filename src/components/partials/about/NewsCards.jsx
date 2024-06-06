import React from "react";
import s from "@/styles/partials/NewsCards.module.scss";

export default function NewsCards() {
  return (
    <section className={s.cards_block}>
      <h3>Город</h3>
      <div className={s.card}>
        <div className={s.header}>
          <h5>Категория</h5>
          <span>03.22.2023</span>
        </div>
        <p>
          NASA отменила запуск Boeing Starliner из-за технических неисправностей
        </p>
      </div>
      <div className={s.card}>
        <div className={s.header}>
          <h5>Категория</h5>
          <span>03.22.2023</span>
        </div>
        <p>
          NASA отменила запуск Boeing Starliner из-за технических неисправностей
        </p>
      </div>
      <div className={s.card}>
        <div className={s.header}>
          <h5>Категория</h5>
          <span>03.22.2023</span>
        </div>
        <p>
          NASA отменила запуск Boeing Starliner из-за технических неисправностей
        </p>
      </div>
    </section>
  );
}
