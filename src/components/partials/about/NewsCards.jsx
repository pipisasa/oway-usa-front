import React from "react";
import s from "@/styles/partials/NewsCards.module.scss";

export default function NewsCards({ city, bulletins }) {
  return (
    <section className={s.cards_block}>
      <h3>{city}</h3>
      {bulletins.map((bulletin) => (
        <div key={bulletin.id} className={s.card}>
          <div className={s.header}>
            <h5 style={{ backgroundColor: `${bulletin.color}` }}>
              {bulletin.category}
            </h5>
            <span>{bulletin.publication_date}</span>
          </div>
          <p>{bulletin.text}</p>
        </div>
      ))}
    </section>
  );
}
