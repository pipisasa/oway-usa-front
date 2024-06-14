import React from "react";
import s from "@/styles/partials/NewsCards.module.scss";

export default function NewsCards({ city, bulletins, bulletins1 }) {
  return (
    <section className={s.cards_block}>
      <h3>{city}</h3>
      {bulletins.map((bulletin) => {
        const matchingBulletin = bulletins1.find(
          (item) => item.id === bulletin.item_category
        );

        return matchingBulletin ? (
          <div key={bulletin.id} className={s.card}>
            <div className={s.header}>
              <h5 style={{ backgroundColor: `${matchingBulletin.color}` }}>
                {matchingBulletin.name}
              </h5>
              <span>{bulletin.publication_date}</span>
            </div>
            <p>{bulletin.text}</p>
          </div>
        ) : null;
      })}
    </section>
  );
}
