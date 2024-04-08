import React from "react";
import s from "@/styles/screens/main/Markets.module.scss";
import Button from "../../partials/Button";

export default function Markets() {
  return (
    <div className={s.heroSection_page}>
      <div className={`${s.heroSection_page} container`}>
        <div className={s.heroSection_info}>
          <h1>
            Покупайте на <strong>Amazon/TrendYol</strong> <br />
            Получайте в <strong>странах СНГ</strong>
          </h1>
          <div className={s.heroSection_info_span}>
            <span>
              <strong>Amazon</strong> — американская компания, крупнейшая в мире
              на рынках платформ электронной коммерции и публично-облачных
              вычислений по выручке и рыночной капитализации.
            </span>
          </div>
          <Button button="Посетить сайт" />
        </div>
        <div className={s.heroSection_img} data-aos="zoom-out-left">
          <img src="assets/images/marketsBox.png" alt="" />
        </div>
      </div>
    </div>
  );
}
