import React from "react";
import s from "@/styles/screens/main/Join.module.scss";
import Button from "../../partials/Button";

export default function Join() {
  return (
    <div className={`${s.join} container`}>
      <div className={s.join_info}>
        <h1>
          Проживаете в США и регулярно передаете посылки своим близким и
          друзьям?{" "}
        </h1>
        <div>
          <div></div>
          <span>
            Сталкиваетесь с трудностями в отправке любимых брендов и других
            товаров из-за ограничений? Теперь нет необходимости отказывать своим
            близким!
          </span>
        </div>
        <div>
          <div className={s.join_info_div}></div>
          <span>
            Передача посылок из Америки стала удобной всего в несколько кликов,
            без каких-либо ограничений на виды товаров. Экономьте время,
            средства и избегайте беспокойств ваших друзей с помощью доставки от
            Owayusa.net.
          </span>
        </div>
        <Button button="Присоединиться" />
      </div>
      <div className={s.join_img} data-aos="zoom-in-up">
        <img src="assets/images/join_image.png" alt="" />
      </div>
    </div>
  );
}
