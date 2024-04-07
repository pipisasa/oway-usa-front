import React from "react";
import s from "@/styles/screens/main/AboutMIssion.module.scss";
import { Slider } from "@/components/partials/Slider";

export default function AboutMission() {
  return (
    <section className="container">
      <div className={s.mission}>
        <span>Наша миссия</span>
        <div className={s.mission_header}>
          <h1>Миссия компании OWAY USA заключается в четырех принципа:</h1>
          <div className={s.mission_header_info}>
            <div></div>
            <span>
              <strong>Наш портфель услуг</strong> включает в себя отзывы
              клиентов, возможность однокликовой покупки, персонализированные
              рекомендации, а также такие уникальные предложения, как "Помощь
              при покупке", "Собственная цепочка логистических путей",
              "Возможность заказать из СНГ в США", и "Сопровождение бизнеса на
              территории Турции". Все эти услуги сделали OWAY USA одним из
              лучших в своей области.
            </span>
          </div>
        </div>
        <div className={s.mission_blocks}>
        <div className={s.mission_block1}>
            <img src="assets/icons/mission_notebook.svg" alt="" />
            <h3>Фокус на клиенте, а не на конкурентах</h3>
          </div>
          <div className={s.mission_block1}>
            <img src="assets/icons/mission_book.svg" alt="" />
            <h3>Стремление к постоянному совершенствованию</h3>
          </div>
          <div className={s.mission_block1}>
            <img src="assets/icons/mission_box.svg" alt="" />
            <h3>Обязательстве к операционной отличности</h3>
          </div>
          <div className={s.mission_block1}>
            <img src="assets/icons/mission_box.svg" alt="" />
            <h3>Обязательстве к долгосрочной перспектике</h3>
          </div>
        <Slider>
          <div className={s.mission_block}>
            <img src="assets/icons/mission_notebook.svg" alt="" />
            <h3>Фокус на клиенте, а не на конкурентах</h3>
          </div>
          <div className={s.mission_block}>
            <img src="assets/icons/mission_book.svg" alt="" />
            <h3>Стремление к постоянному совершенствованию</h3>
          </div>
          <div className={s.mission_block}>
            <img src="assets/icons/mission_box.svg" alt="" />
            <h3>Обязательстве к операционной отличности</h3>
          </div>
          <div className={s.mission_block}>
            <img src="assets/icons/mission_box.svg" alt="" />
            <h3>Обязательстве к долгосрочной перспектике</h3>
          </div>
        </Slider>
        </div>
      </div>
    </section>
  );
}
