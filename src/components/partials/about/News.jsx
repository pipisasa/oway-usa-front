import React, { useRef } from "react";
import s from "@/styles/partials/News.module.scss";
import NewsCards from "./NewsCards";
import useBulletinBoard from "@/hooks/admin/useBulletinBoard";
import useBulletinBoardCategory from "@/hooks/admin/useBulletinBoardCategory";

export default function News() {
  const { bulletins, loading, error } = useBulletinBoard();
  const { bulletins1 } = useBulletinBoardCategory();
  const containerRef = useRef(null);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;
  console.log(bulletins);

  const bulletinsByCity = bulletins.reduce((acc, bulletin) => {
    if (!acc[bulletin.city]) {
      acc[bulletin.city] = [];
    }
    acc[bulletin.city].push(bulletin);
    return acc;
  }, {});

  const scrollLeft = () => {
    containerRef.current.scrollBy({
      left: -containerRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({
      left: containerRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className={`container ${s.news_contrainer}`}>
      <div className={s.news_header}>
        <div className={s.titles}>
          <p>Объявления</p>
          <h2>Доска объявлений</h2>
        </div>
        <div className={s.slider_btns}>
          <button onClick={scrollLeft}>
            <img src="/assets/icons/arrowLeft.svg" alt="" />
          </button>
          <button onClick={scrollRight}>
            <img src="/assets/icons/arrowRight.svg" alt="" />
          </button>
        </div>
      </div>
      <div className={s.news_cards} ref={containerRef}>
        {Object.keys(bulletinsByCity).map((city) => (
          <NewsCards
            key={city}
            city={city}
            bulletins1={bulletins1}
            bulletins={bulletinsByCity[city]}
          />
        ))}
      </div>
    </section>
  );
}
