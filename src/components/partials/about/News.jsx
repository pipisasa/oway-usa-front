import React from "react";
import s from "@/styles/partials/News.module.scss";
import NewsCards from "./NewsCards";

export default function News() {
  return (
    <section className={`container ${s.news_contrainer}`}>
      <div className={s.news_header}>
        <div className={s.titles}>
          <p>Объявления</p>
          <h2>Доска объявлений</h2>
        </div>
        <div className={s.slider_btns}>
          <button>
            <img src="/assets/icons/arrowLeft.svg" alt="" />
          </button>
          <button>
            <img src="/assets/icons/arrowRight.svg" alt="" />
          </button>
        </div>
      </div>
      <div className={s.news_cards}>
        <NewsCards />
        <NewsCards />
        <NewsCards />
        <NewsCards />
      </div>
    </section>
  );
}
