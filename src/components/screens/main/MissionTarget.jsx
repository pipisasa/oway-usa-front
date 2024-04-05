import React from "react";
import s from "@/styles/screens/main/MissionTarget.module.scss";
import Button from "../../partials/Button";

export default function MissionTarget() {
  return (
    <div className={`${s.join} container`}>
      <div className={s.join_info}>
        <p>Наша цель</p>
        <h1>
          В визионерном заявлении мы стремимся стать самой ориентированной на
          клиента компанией в области доставки из США и Турции в страны СНГ.
        </h1>

        <div>
          <div></div>
          <span>
            <strong>Наша цель</strong>- создать место, где люди могут находить и
            заказывать все необходимое в один клик, получая товары быстро и
            удобно. Мы предоставляем возможность покупок без ограничений по
            стоимости и количеству товаров.
          </span>
        </div>
        <Button button="Закупиться" />
      </div>
      <div className={s.join_img}>
        <img src="assets/images/house.png" alt="" />
      </div>
    </div>
  );
}
