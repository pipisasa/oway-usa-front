import React from "react";
import s from "@/styles/screens/main/Search.module.scss";
import Button from "../../partials/Button";

export default function About() {
  return (
    <div className={s.heroSection_page} data-aos="zoom-out-left">
      <div className={`${s.heroSection_page} container`}>
        <div className={s.heroSection_info}>
          <h1>О компании</h1>
          <div className={s.heroSection_info_span}>
            <div></div>
            <span>
              <strong>OWAY USA </strong> - логистическая компания
              осуществеляющая отправки коммерсечких и физических посылок из США
              и Турции в страны СНГ
            </span>
          </div>
        </div>
        <Button button="Закупиться" />
        <div className={s.heroSection_img1} >
          <img
            src="assets/images/teleshkaOrange.png"
            width={537}
            height={537}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
