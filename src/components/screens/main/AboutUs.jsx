import React from "react";
import s from "@/styles/screens/main/AboutUs.module.scss";

export default function AboutUs() {
  return (
    <div className={`${s.about} container`} data-aos="zoom-out">
      <div className={s.about_info}>
        <span>О компании</span>
        <h1>OWAY USA</h1>
        <div className={s.about_info_spans}>
          <div className={s.about_info_span}>
            <div className={s.about_info_div}></div>
            <span>
              {" "}
              <strong>OWAY USA </strong> - сервис по доставке посылок и
              коммерческих грузов из США и Турции.
            </span>
          </div>
          <div className={s.about_info_span}>
            <div className={s.about_info_div1}></div>
            <span>
              Мы имеем выгодные соглашения с авиалиниями, что дает нам
              возможность предоставлять нашим клиентам низкие цены за
              международные доставки.
            </span>
          </div>
          <div className={s.about_info_span}>
            <div className={s.about_info_div2}></div>
            <span>
              Сегодня <strong>OWAY USA </strong> имеет огромный опыт в доставке
              посылок и грузов, предоставляя услуги в Кыргызстан, Россия,
              Казахстан и Узбекистан.
            </span>
          </div>
          <div className={s.about_info_span}>
            <div className={s.about_info_div3}></div>
            <span>
              Мы предлагаем лучшие сроки и тарифы, которые отвечают Вашим
              потребностям, делая нас надежным партнером.
            </span>
          </div>
        </div>
      </div>
      <div className={s.about_img}>
        <img src="assets/images/moto.png" alt="" />
      </div>
    </div>
  );
}
