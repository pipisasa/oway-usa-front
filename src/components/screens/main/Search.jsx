import React from "react";
import s from "@/styles/screens/main/Search.module.scss";

export default function Search() {
  return (
    <div className={s.heroSection_page}data-aos="zoom-out-left">
      <div className={`${s.heroSection_page} container`}>
        <div className={s.heroSection_info}>
          <h1>Подскажем где Вы можете купить</h1>
          <div className={s.heroSection_info_input}>
            <span>Попробуйте поискать магазин или бренд</span>
            <input type="text" placeholder="Поиск" />
            <span>Например apple, samsung или zara</span>
          </div>
          <div className={s.heroSection_info_span}>
            <div></div>
            <span>
              Мы подобрали для вас лучшие магазины и разделили их на <br />{" "}
              категории.
            </span>
          </div>
          <div className={s.heroSection_info_span}>
            <div></div>
            <span>
              Выбирайте и наслаждайтесь покупками, а мы привезем заказы <br />в
              удобные пункты выдачи или к вам домой за 10-17 дней.
            </span>
          </div>
        </div>
        <div className={s.heroSection_img} data-aos="zoom-out-left">
          <img
            src="assets/images/teleshka.png"
            width={536}
            height={536}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
